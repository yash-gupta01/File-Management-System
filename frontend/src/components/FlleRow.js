// src/components/FileList.js
import React from 'react';
import axios from 'axios';

export const  FileRow = ({file}) => {

  const handleFileDownload = async (id, filename) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/download/${id}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

    return (
    <li key={file._id} className="mb-2">
      {file.originalName &&
      <>{file.originalName}
      <button
        onClick={() => handleFileDownload(file._id, file.originalName)}
        className="ml-4 bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
      >
        Download
      </button>
      <button>View </button>
      </>}
    </li>
  )};