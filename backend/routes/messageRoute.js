import express from "express";
import {
  sendMessage,
  getMessage,
  sendGroupMessage,
  getGroupMessages,
  markGroupRead,
} from "../controllers/messageController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();
router.route("/send/:id").post(isAuthenticated, sendMessage);
router.route("/:id").get(isAuthenticated, getMessage);
router.route("/group/send/:roomId").post(isAuthenticated, sendGroupMessage);
router.route("/group/:roomId").get(isAuthenticated, getGroupMessages);
router.route("/group/read/:roomId").post(isAuthenticated, markGroupRead);

export default router;
