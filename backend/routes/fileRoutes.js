const express = require('express');
const multer = require('multer');
const File = require('../models/File');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
    });
    await file.save();
    res.status(201).send({ message: 'File uploaded successfully', file });
  } catch (error) {
    res.status(500).send({ error: 'Failed to upload file' });
  }
});

// List All Files
router.get('/files', async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch files' });
  }
});

// Download File
router.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).send({ error: 'File not found' });
    }
    res.download(file.path, file.originalName);
  } catch (error) {
    res.status(500).send({ error: 'Failed to download file' });
  }
});

module.exports = router;