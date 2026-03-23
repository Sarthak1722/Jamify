import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function normalizeTrack(track) {
  if (!track) {
    return null;
  }

  return {
    _id: track._id ?? track.trackId ?? track.id ?? null,
    id: track.id ?? track.trackId ?? track._id ?? null,
    trackId: track.trackId ?? track.id ?? track._id ?? null,
    title: track.title ?? "",
    artist: track.artist ?? "",
    url: track.url ?? "",
    addedAt: track.addedAt ?? null,
  };
}

function normalizePlaylist(playlist) {
  const tracksSource = Array.isArray(playlist?.songs)
    ? playlist.songs
    : Array.isArray(playlist?.tracks)
      ? playlist.tracks
      : [];
  const tracks = tracksSource.map(normalizeTrack).filter(Boolean);
  const trackIds = Array.isArray(playlist?.trackIds)
    ? playlist.trackIds
    : tracks.map((track) => track.trackId).filter(Boolean);

  return {
    ...playlist,
    _id: playlist?._id ?? playlist?.id ?? null,
    id: playlist?.id ?? playlist?._id ?? null,
    tracks,
    songs: tracks,
    trackIds,
    trackCount: playlist?.trackCount ?? tracks.length,
  };
}

/**
 * Get all playlists for the current user
 */
export async function fetchUserPlaylists() {
  const { data } = await axios.get(`${API_URL}/api/v1/playlists`, {
    withCredentials: true,
  });
  return data.success ? data.playlists.map(normalizePlaylist) : [];
}

/**
 * Create a new playlist
 */
export async function createPlaylist(playlistData) {
  const { data } = await axios.post(`${API_URL}/api/v1/playlists`, playlistData, {
    withCredentials: true,
  });
  return data.success ? normalizePlaylist(data.playlist) : null;
}

/**
 * Get a specific playlist with full details
 */
export async function fetchPlaylist(playlistId) {
  const { data } = await axios.get(`${API_URL}/api/v1/playlists/${playlistId}`, {
    withCredentials: true,
  });
  return data.success ? normalizePlaylist(data.playlist) : null;
}

/**
 * Update playlist metadata
 */
export async function updatePlaylist(playlistId, updateData) {
  const { data } = await axios.put(`${API_URL}/api/v1/playlists/${playlistId}`, updateData, {
    withCredentials: true,
  });
  return data.success ? normalizePlaylist(data.playlist) : null;
}

/**
 * Delete a playlist
 */
export async function deletePlaylist(playlistId) {
  const { data } = await axios.delete(`${API_URL}/api/v1/playlists/${playlistId}`, {
    withCredentials: true,
  });
  return data.success;
}

/**
 * Add a track to a playlist
 */
export async function addTrackToPlaylist(playlistId, trackData) {
  const { data } = await axios.post(`${API_URL}/api/v1/playlists/${playlistId}/tracks`, trackData, {
    withCredentials: true,
  });
  return data.success ? normalizePlaylist(data.playlist) : null;
}

/**
 * Remove a track from a playlist
 */
export async function removeTrackFromPlaylist(playlistId, trackId) {
  const { data } = await axios.delete(`${API_URL}/api/v1/playlists/${playlistId}/tracks/${trackId}`, {
    withCredentials: true,
  });
  return data.success;
}
