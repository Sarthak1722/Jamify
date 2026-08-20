import React, { useRef } from "react";
import { usePlaybackSocket } from "../../hooks/usePlaybackSocket.js";
import { usePlaybackAudioSync } from "../../hooks/usePlaybackAudioSync.js";
import { PlaybackActionsContext } from "./playbackActionsContext.js";
import { usePlaybackActions } from "./usePlaybackActions.js";

function GlobalAudioEngine() {
  const audioRef = useRef(null);
  const { emitNextTrack } = usePlaybackActions();
  usePlaybackAudioSync(audioRef);

  return (
    <audio
      ref={audioRef}
      preload="auto"
      className="hidden"
      onEnded={emitNextTrack}
    />
  );
}

/**
 * Single place for playback socket join + listeners + singleton audio element;
 * ensures strictly ONE <audio> engine exists in the DOM across desktop & mobile.
 */
export default function PlaybackActionsProvider({ children }) {
  const actions = usePlaybackSocket();
  return (
    <PlaybackActionsContext.Provider value={actions}>
      <GlobalAudioEngine />
      {children}
    </PlaybackActionsContext.Provider>
  );
}
