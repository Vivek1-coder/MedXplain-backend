import express from "express";
import {
  createNewChat,
  getUserChats,
  getChatById,
  renameChat,
  deleteChat,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/", createNewChat);
router.get("/user/:userId", getUserChats);
router.get("/:chatId", getChatById);
router.patch("/:chatId/title", renameChat);
router.delete("/:chatId", deleteChat);

export default router;
