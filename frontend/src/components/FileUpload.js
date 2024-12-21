// src/components/FileUpload.js
import React, { useState } from 'react';
import { Button, Input, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../store/fileSlice';

const FileUpload = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const allowedFileTypes = ['text/plain', 'image/jpeg', 'image/png', 'application/json'];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && !allowedFileTypes.includes(selectedFile.type)) {
      setError('File type not allowed. Please select a valid file (txt, jpg, png, json).');
      setFile(null);
    } else {
      setError('');
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      await dispatch(uploadFile(formData));
      setFile(null);
    }
  };

  return (
    <form onSubmit={handleFileUpload}>
      <Input
        type="file"
        onChange={handleFileChange}
        fullWidth
        inputProps={{ accept: '.txt,.jpg,.png,.json' }}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button
        type="submit"
        color="primary"
        variant="contained"
        disabled={!file}
        style={{ marginTop: '10px' }}
      >
        Upload File
      </Button>
    </form>
  );
};

export default FileUpload;
