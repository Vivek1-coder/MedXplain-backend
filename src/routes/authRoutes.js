import express from "express";
import { signupUser, loginUser } from "../controllers/authController.js";
import { validateUser } from "../middleware/validateUser.js";
import { extractLabReportData } from '../controllers/pdfParseController.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();


router.post("/signup", validateUser, signupUser);
router.post("/login", validateUser, loginUser);

// router.post('/parse-lab-report', upload.single('pdf'), extractLabReportData);


export default router;
