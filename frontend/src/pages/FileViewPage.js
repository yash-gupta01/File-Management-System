// src/pages/FileViewPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Paper } from '@mui/material';

const FileViewPage = () => {
  const { fileId } = useParams();
  const [fileContent, setFileContent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/file-content/${fileId}`);
        setFileContent(response.data);
      } catch (err) {
        setError('Error fetching file content');
      }
    };
    fetchFileContent();
  }, [fileId]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5">File Content</Typography>
        {fileContent ? (
          fileContent.type === 'text' || fileContent.type === 'json' ? (
            <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(fileContent.content, null, 2)}
            </Typography>
          ) : (
            <img src={`data:image/jpeg;base64,${fileContent.content}`} alt="File content" style={{ width: '100%' }} />
          )
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default FileViewPage;
