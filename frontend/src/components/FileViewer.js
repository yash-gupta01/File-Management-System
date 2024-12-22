import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const FileViewer = () => {
  const location = useLocation();
  const { fileId, fileName } = location.state || {};
  console.log(fileId,fileName);
  const [fileContent, setFileContent] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const downloadFile = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`http://localhost:3000/api/download/${fileId}`, {
          responseType: 'blob',
        });

        const contentType = response.headers['content-type'];
        setFileType(contentType);

        const fileBlob = new Blob([response.data], { type: contentType });

        if (contentType.includes('text') || contentType === 'application/json') {
          const text = await fileBlob.text();
          setFileContent(
          <span className=' border-2 border-gray-600'>
            <p>{text}</p>
            </span>);
        } else if (contentType.includes('image')) {
          const url = URL.createObjectURL(fileBlob);
          setFileContent(<img src={url} alt={fileName} style={{ width: '90%',  height: '90%', objectFit: 'contain', border: '2px' }}
            />);
        } else if (contentType === 'application/pdf') {
          const url = URL.createObjectURL(fileBlob);
          setFileContent(
            <iframe
            src={url}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            title="PDF Viewer"
          ></iframe>
        );
        } else {
          setFileContent(<p>Unsupported file type: {contentType}</p>);
        }
      } catch (err) {
        console.error('Error downloading file:', err);
        setError('Failed to load file. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    downloadFile();
  }, [fileId, fileName]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
    <h2>File: {fileName}</h2>
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p style={{ color: 'red' }}>{error}</p>
    ) : (
      <div className="file-content" style={{ marginTop: '1rem' }}>
        {fileContent}
      </div>
    )}
  </div>  
  );
};

export default FileViewer;
