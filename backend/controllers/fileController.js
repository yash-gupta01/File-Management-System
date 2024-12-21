const File = require('../models/File');
const path = require('path');

exports.uploadFile = async (req, res) => {
  try {
    const file = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
    });
    await file.save();
    res.status(201).json({ message: 'File uploaded successfully!', file });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading file' });
  }
};

exports.listFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving files' });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });
    res.download(file.path, file.originalName);
  } catch (error) {
    res.status(500).json({ error: 'Error downloading file' });
  }
};