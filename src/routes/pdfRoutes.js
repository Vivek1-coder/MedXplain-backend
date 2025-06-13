import express from "express";
const router = express.Router();
import multer from "multer";
import { extractLabReportData } from "../controllers/pdfParseController.js";

// Ensure uploads directory exists
const uploadDir = "uploads/";
import { promises as fs } from "fs";
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

// File upload config
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB limit
  },
});

router.post(
  "/parse-lab-report",
  upload.single("pdf"),
  extractLabReportData
);

export default router;
