// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from './store/fileSlice';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';

const App = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.list);

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">File Management</h1>

      {/* File Upload */}
      <FileUpload />

      {/* File List */}
      <FileList files={files} />
    </div>
  );
};

export default App;
