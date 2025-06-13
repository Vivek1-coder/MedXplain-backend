import express from 'express';
import multer from 'multer';
import path from 'path';
import { extractLabReportData } from '../controllers/pdfParseController.js';

// Ensure uploads directory exists
const uploadDir = 'uploads/';
import { promises as fs } from 'fs';
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

// File upload config
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB limit
  }
});

const router = express.Router();

router.post('/parse-lab-report', upload.single('pdf'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No PDF file uploaded' });
  }
  extractLabReportData(req, res, next);
});

export default router;