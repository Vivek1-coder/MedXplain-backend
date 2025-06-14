import express from "express";
import { addMessage } from "../controllers/messageController.js";
import { isAuthorised } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:chatId/message", addMessage,isAuthorised);

export default router;
