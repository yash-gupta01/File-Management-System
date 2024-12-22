const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { uploadFile, downloadFile, listFiles } = require('../controllers/fileController');

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.resolve('./uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

// Routes
router.post('/upload', upload.single('file'), uploadFile);
router.get('/download/:id', downloadFile);
router.get('/files', listFiles);

module.exports = router;
