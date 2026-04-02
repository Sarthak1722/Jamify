import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  createRoom,
  listMyRooms,
  getRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController.js";

const router = express.Router();

router.route("/").get(isAuthenticated, listMyRooms).post(isAuthenticated, createRoom);
router.route("/:id").get(isAuthenticated, getRoom).patch(isAuthenticated, updateRoom).delete(isAuthenticated, deleteRoom);

export default router;
