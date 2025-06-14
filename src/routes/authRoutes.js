import express from "express";
import { signupUser, loginUser, LogoutUser } from "../controllers/authController.js";
import { validateUser } from "../middleware/validateUser.js";
import { isAuthorised } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", validateUser, signupUser);
router.post("/login", validateUser, loginUser);
router.post("/logout", isAuthorised, LogoutUser);

export default router;
