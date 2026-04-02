import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  createRoom,
  listMyRooms,
  getRoom,
  updateRoom,
  deleteRoom,
  addRoomMembers,
  leaveRoom,
  updateRoomAdmin,
} from "../controllers/roomController.js";

const router = express.Router();

router.route("/").get(isAuthenticated, listMyRooms).post(isAuthenticated, createRoom);
router.route("/:id").get(isAuthenticated, getRoom).patch(isAuthenticated, updateRoom).delete(isAuthenticated, deleteRoom);
router.route("/:id/members").post(isAuthenticated, addRoomMembers);
router.route("/:id/leave").post(isAuthenticated, leaveRoom);
router.route("/:id/admins").post(isAuthenticated, updateRoomAdmin);

export default router;
