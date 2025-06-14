import express from "express";
import {
  createNewChat,
  getUserChats,
  getChatById,
  renameChat,
  deleteChat,
} from "../controllers/chatController.js";
import { isAuthorised } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createNewChat,isAuthorised);
router.get("/user", getUserChats,isAuthorised);
router.get("/:chatId", getChatById,isAuthorised);
router.patch("/:chatId/title", renameChat,isAuthorised);
router.delete("/:chatId", deleteChat,isAuthorised);

export default router;
