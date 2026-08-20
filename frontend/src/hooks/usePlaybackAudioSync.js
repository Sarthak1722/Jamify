import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { effectivePlaybackTime } from "../utils/playbackTime.js";
import { resolveAppUrl } from "../config/runtime.js";
import { getTrackDurationSeconds } from "../utils/trackDuration.js";

export function fullAudioUrl(urlPath) {
  return resolveAppUrl(urlPath);
}

// Drift thresholds (in seconds)
// Audio decoders naturally jitter by ~50-100ms; hard-seeking within this range causes audio dropouts/lag.
const HARD_DESYNC_THRESHOLD = 1.2; // 1.2s: only hard seek on massive lag/desync
const DRIFT_DEADBAND = 0.15; // 150ms: deadband where playback is considered in sync (1.0x)
const FAST_RATE = 1.02; // 2% speed-up to smoothly catch up without pitch distortion
const SLOW_RATE = 0.98; // 2% slow-down to smoothly wait for master clock

/**
 * Butter-Smooth Audio Synchronizer.
 * Ensures continuous, glitch-free audio playback while keeping multiple devices
 * locked in sync via server-anchored NTP time and subtle playbackRate adjustments.
 */
export function usePlaybackAudioSync(audioRef) {
  const playback = useSelector((s) => s.playback);
  const lastStateKeyRef = useRef("");
  const isSeekingOrBufferingRef = useRef(false);

  const currentTrack = playback.currentTrack;
  const isPlaying = playback.isPlaying;
  const positionSeconds = playback.positionSeconds;
  const playheadEpochMs = playback.playheadEpochMs;
  const trackId = currentTrack?.id;
  const trackUrl = currentTrack?.url;
  const trackDurationSeconds = getTrackDurationSeconds(currentTrack);

  // 1. Manage track source & discrete state transitions (Play / Pause / Seek / Track Change)
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    if (!trackUrl) {
      el.pause();
      el.playbackRate = 1.0;
      el.removeAttribute("src");
      el.removeAttribute("data-playback-src");
      lastStateKeyRef.current = "";
      return;
    }

    const nextSrc = fullAudioUrl(trackUrl);
    const prevSrc = el.getAttribute("data-playback-src");
    const isNewTrack = prevSrc !== nextSrc;

    if (isNewTrack) {
      el.setAttribute("data-playback-src", nextSrc);
      el.src = nextSrc;
      el.load();
    }

    const applyState = () => {
      const targetTime = effectivePlaybackTime(playback);
      const clampedTime =
        Number.isFinite(trackDurationSeconds) && trackDurationSeconds > 0
          ? Math.min(Math.max(0, targetTime), trackDurationSeconds)
          : Math.max(0, targetTime);

      // State key identifies unique discrete events (e.g. track change, seek to new position, play/pause toggle)
      const stateKey = `${trackId}:${positionSeconds.toFixed(2)}:${isPlaying ? 1 : 0}:${playheadEpochMs ?? 0}`;
      const stateChanged = lastStateKeyRef.current !== stateKey;

      if (stateChanged || isNewTrack) {
        lastStateKeyRef.current = stateKey;

        // If time difference is noticeable (>250ms) on a state transition or track change, seek to anchor
        const delta = Math.abs(el.currentTime - clampedTime);
        if (isNewTrack || delta > 0.25) {
          if (Number.isFinite(clampedTime) && clampedTime >= 0) {
            el.currentTime = clampedTime;
          }
        }
        el.playbackRate = 1.0;
      }

      if (isPlaying) {
        if (el.paused) {
          el.play().catch(() => {});
        }
      } else {
        if (!el.paused) {
          el.pause();
        }
        el.playbackRate = 1.0;
      }
    };

    if (el.readyState >= 1) {
      applyState();
    } else {
      const onLoadedMeta = () => {
        applyState();
        el.removeEventListener("loadedmetadata", onLoadedMeta);
      };
      el.addEventListener("loadedmetadata", onLoadedMeta);
      return () => el.removeEventListener("loadedmetadata", onLoadedMeta);
    }
  }, [
    audioRef,
    trackId,
    trackUrl,
    isPlaying,
    positionSeconds,
    playheadEpochMs,
    trackDurationSeconds,
    playback,
  ]);

  // 2. Smooth Phase-Lock Loop (PLL) drift monitoring
  // Runs every 1 second during active playback to gently adjust playbackRate (0.98x - 1.02x)
  // without EVER interrupting audio flow or causing pops/stutters.
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !isPlaying || !trackId) return;

    const onSeeking = () => {
      isSeekingOrBufferingRef.current = true;
    };
    const onSeeked = () => {
      isSeekingOrBufferingRef.current = false;
    };

    el.addEventListener("seeking", onSeeking);
    el.addEventListener("seeked", onSeeked);

    const checkDrift = () => {
      if (!el || el.paused || el.seeking || isSeekingOrBufferingRef.current || el.readyState < 2) {
        return;
      }

      const targetTime = effectivePlaybackTime(playback);
      const clampedTarget =
        Number.isFinite(trackDurationSeconds) && trackDurationSeconds > 0
          ? Math.min(Math.max(0, targetTime), trackDurationSeconds)
          : Math.max(0, targetTime);

      const delta = el.currentTime - clampedTarget; // positive: ahead, negative: behind

      if (Math.abs(delta) > HARD_DESYNC_THRESHOLD) {
        // Massive lag spike (> 1.2s, e.g. tab frozen or stalled connection): seek directly
        el.currentTime = clampedTarget;
        el.playbackRate = 1.0;
      } else if (delta < -DRIFT_DEADBAND) {
        // Audio is slightly behind (> 150ms): smoothly speed up by 2%
        if (el.playbackRate !== FAST_RATE) {
          el.playbackRate = FAST_RATE;
        }
      } else if (delta > DRIFT_DEADBAND) {
        // Audio is slightly ahead (> 150ms): smoothly slow down by 2%
        if (el.playbackRate !== SLOW_RATE) {
          el.playbackRate = SLOW_RATE;
        }
      } else {
        // In sync within 150ms deadband: play at normal 1.0x speed
        if (el.playbackRate !== 1.0) {
          el.playbackRate = 1.0;
        }
      }
    };

    const intervalId = setInterval(checkDrift, 1000);

    return () => {
      clearInterval(intervalId);
      el.removeEventListener("seeking", onSeeking);
      el.removeEventListener("seeked", onSeeked);
      if (el) el.playbackRate = 1.0;
    };
  }, [audioRef, isPlaying, trackId, playback, trackDurationSeconds]);
}
