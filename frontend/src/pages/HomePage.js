// src/pages/HomePage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from '../store/fileSlice';
import FileList from '../components/FileList';
import FileUpload from '../components/FileUpload';
import { Container, Typography, Paper } from '@mui/material';

const HomePage = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.list);

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        File Management System
      </Typography>
      
      {/* File Upload Button */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <FileUpload />
      </Paper>

      {/* File List */}
      <FileList files={files} />
    </Container>
  );
};

export default HomePage;
