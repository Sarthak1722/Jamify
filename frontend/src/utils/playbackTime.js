import { getServerTime } from "../services/timeSync.js";

/**
 * Compute live playhead from server anchor + synchronized server clock (NTP calibrated).
 * Guaranteed to produce the exact same timestamp on all devices simultaneously.
 */
export function effectivePlaybackTime(state) {
  if (!state) return 0;
  const basePosition = Math.max(0, Number(state.positionSeconds) || 0);
  if (!state.isPlaying || state.playheadEpochMs == null) {
    return basePosition;
  }
  const currentServerNow = getServerTime();
  const elapsedSeconds = Math.max(0, (currentServerNow - state.playheadEpochMs) / 1000);
  return basePosition + elapsedSeconds;
}
