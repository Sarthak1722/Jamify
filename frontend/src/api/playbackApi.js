import apiClient from "./client.js";

/** Phase 1: static catalog. Phase 2: point this at Spotify-backed endpoint. */
export async function fetchPlaybackTracks() {
  const { data } = await apiClient.get("/api/v1/playback/tracks");
  return Array.isArray(data.tracks) ? data.tracks : [];
}
