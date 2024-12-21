// src/components/FileList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Button, Grid, Typography } from '@mui/material';

const FileList = ({ files }) => {
  const navigate = useNavigate();

  const handleFileClick = (fileId) => {
    navigate(`/file-view/${fileId}`);
  };

  return (
    <Grid container spacing={2}>
      {files.map((file) => (
        <Grid item xs={12} sm={6} md={4} key={file._id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{file.originalName}</Typography>
              <Typography variant="body2" color="textSecondary">
                {file.fileType} - {file.size} MB
              </Typography>
              <Button
                onClick={() => handleFileClick(file._id)}
                color="primary"
                variant="contained"
                style={{ marginTop: '10px' }}
              >
                View File
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FileList;
