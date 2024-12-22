// src/components/FileDownload.js
import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const FileDownload = ({ fileId, fileName }) => {
  const handleFileDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/download/${fileId}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleFileDownload}
    >
      Download
    </Button>
  );
};

export default FileDownload;
