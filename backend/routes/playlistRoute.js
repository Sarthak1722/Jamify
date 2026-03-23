import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  getUserPlaylists,
  createPlaylist,
  getPlaylist,
  updatePlaylist,
  deletePlaylist,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
} from "../controllers/playlistController.js";

const router = express.Router();

// Get all user playlists
router.route("/").get(isAuthenticated, getUserPlaylists);

// Create new playlist
router.route("/").post(isAuthenticated, createPlaylist);

// Get specific playlist
router.route("/:id").get(isAuthenticated, getPlaylist);

// Update playlist metadata
router.route("/:id").put(isAuthenticated, updatePlaylist);

// Delete playlist
router.route("/:id").delete(isAuthenticated, deletePlaylist);

// Add track to playlist
router.route("/:id/tracks").post(isAuthenticated, addTrackToPlaylist);

// Remove track from playlist
router.route("/:id/tracks/:trackId").delete(isAuthenticated, removeTrackFromPlaylist);

export default router;