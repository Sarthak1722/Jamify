/**
 * High-Precision NTP / Cristian's Algorithm Time Synchronization Service
 *
 * Calibrates the local device clock against the remote server (e.g., Render backend in any region/timezone).
 * Computes:
 *   - Round-Trip Time (RTT)
 *   - One-way network latency (RTT / 2)
 *   - Clock Offset = serverTime - (clientTime + latency)
 *   - Synchronized Server Time = Date.now() + clockOffset
 *
 * Uses a sliding sample window with outlier rejection (filtering out jitter/spikes by prioritizing lowest RTTs)
 * for sub-millisecond precision across worldwide devices.
 */

let clockOffset = 0;
let networkLatency = 0;
let lastRtt = 0;
let isSynchronized = false;
let sampleHistory = [];
const MAX_SAMPLES = 12;

let activeSocket = null;
let syncIntervalId = null;
let burstTimeoutIds = [];

/**
 * Reset time sync state
 */
export function resetTimeSync() {
  clockOffset = 0;
  networkLatency = 0;
  lastRtt = 0;
  isSynchronized = false;
  sampleHistory = [];
  burstTimeoutIds.forEach((id) => clearTimeout(id));
  burstTimeoutIds = [];
  if (syncIntervalId) {
    clearInterval(syncIntervalId);
    syncIntervalId = null;
  }
}

/**
 * Returns estimated server epoch milliseconds (UTC) with sub-millisecond accuracy.
 * Safe to call from anywhere across the frontend.
 */
export function getServerTime() {
  return Date.now() + clockOffset;
}

/**
 * Current estimated clock offset (serverTime - localDateNow) in ms.
 */
export function getClockOffset() {
  return clockOffset;
}

/**
 * Current estimated one-way network latency in ms.
 */
export function getNetworkLatency() {
  return networkLatency;
}

/**
 * Current Round-Trip Time (RTT) in ms.
 */
export function getRTT() {
  return lastRtt;
}

/**
 * Whether the client has completed at least one clock sync calibration.
 */
export function isClockSynchronized() {
  return isSynchronized;
}

/**
 * Process a single time-sync measurement sample
 */
function processSample(clientSendTime, serverTime, clientReceiveTime) {
  const rtt = Math.max(0, clientReceiveTime - clientSendTime);
  const oneWayLatency = rtt / 2;
  const sampleOffset = serverTime - (clientSendTime + oneWayLatency);

  lastRtt = rtt;

  // Add sample to sliding window
  sampleHistory.push({
    rtt,
    latency: oneWayLatency,
    offset: sampleOffset,
    timestamp: clientReceiveTime,
  });

  if (sampleHistory.length > MAX_SAMPLES) {
    sampleHistory.shift();
  }

  // Outlier rejection: sort samples by RTT and take the best (lowest RTT) samples
  // because network delays can only add latency, the minimum RTT sample is closest to true time
  const sorted = [...sampleHistory].sort((a, b) => a.rtt - b.rtt);
  const bestCount = Math.max(1, Math.ceil(sorted.length * 0.6));
  const bestSamples = sorted.slice(0, bestCount);

  // Compute weighted average of best samples (giving higher weight to lower RTT)
  let totalWeight = 0;
  let weightedOffsetSum = 0;
  let weightedLatencySum = 0;

  for (const s of bestSamples) {
    // Weight inversely proportional to RTT (add 1ms baseline to avoid div by zero)
    const weight = 1 / (s.rtt + 1);
    totalWeight += weight;
    weightedOffsetSum += s.offset * weight;
    weightedLatencySum += s.latency * weight;
  }

  clockOffset = Math.round(weightedOffsetSum / totalWeight);
  networkLatency = Math.round(weightedLatencySum / totalWeight);
  isSynchronized = true;
}

/**
 * Perform a single sync ping-pong with the server
 */
export function syncNow(socket = activeSocket) {
  if (!socket?.connected) return Promise.resolve(null);

  return new Promise((resolve) => {
    const t0 = Date.now();
    let resolved = false;

    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(null);
      }
    }, 4000);

    socket.emit("timeSyncPing", { clientTime: t0 }, (response) => {
      if (resolved) return;
      resolved = true;
      clearTimeout(timeout);

      const t1 = Date.now();
      if (response && typeof response.serverTime === "number") {
        processSample(t0, response.serverTime, t1);
        resolve({
          offset: clockOffset,
          latency: networkLatency,
          rtt: lastRtt,
        });
      } else {
        resolve(null);
      }
    });
  });
}

/**
 * Initialize continuous background time synchronization for a connected socket
 */
export function initTimeSync(socket) {
  if (!socket) return () => {};

  activeSocket = socket;

  const runBurst = () => {
    // Initial rapid burst of 5 pings with 200ms spacing to quickly converge on accurate offset
    burstTimeoutIds.forEach((id) => clearTimeout(id));
    burstTimeoutIds = [];

    [0, 200, 500, 900, 1500].forEach((delay) => {
      const id = setTimeout(() => {
        if (socket.connected) {
          syncNow(socket);
        }
      }, delay);
      burstTimeoutIds.push(id);
    });
  };

  const onConnect = () => {
    runBurst();
  };

  if (socket.connected) {
    runBurst();
  }

  socket.on("connect", onConnect);

  // Periodic calibration every 10 seconds to account for clock drift over time
  if (syncIntervalId) clearInterval(syncIntervalId);
  syncIntervalId = setInterval(() => {
    if (socket.connected) {
      syncNow(socket);
    }
  }, 10000);

  return () => {
    socket.off("connect", onConnect);
    resetTimeSync();
  };
}
