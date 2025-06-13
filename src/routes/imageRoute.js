// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import { extractText } from '../controllers/imageController.js';
// import fs from 'fs/promises';

// // Ensure uploads directory exists
// const uploadDir = 'uploads/';
// await fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

// // Configure Multer
// const storage = multer.diskStorage({
//   destination: uploadDir,
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed!'), false);
//   }
// };

// const upload = multer({ 
//   storage,
//   fileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
// });

// const router = express.Router();

// router.post('/extract-text', upload.single('image'), (req, res, next) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No image uploaded' });
//   }
//   extractText(req, res, next);
// });

// export default router;

// imageRoute.js
import express from 'express';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/extract-text', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Process file here
  res.json({ extractedText: 'Sample text' });
});

export default router;