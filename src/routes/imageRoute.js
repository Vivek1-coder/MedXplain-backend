// routes/uploadRoute.js
import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import { extractText } from '../controllers/imageController.js';

const uploadDir = 'uploads/';
await fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
});

const router = express.Router();

router.post('/extract-text', upload.single('image'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }
  return extractText(req, res, next);
});

export default router;
