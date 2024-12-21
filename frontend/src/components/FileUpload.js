import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile, fetchFiles } from '../store/fileSlice';

const FileUpload = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      dispatch(uploadFile(formData));
      setFile(null);
      dispatch(fetchFiles());  

    }
  };

  return (
    <form onSubmit={handleFileUpload} className="mb-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 mb-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Upload File
      </button>
    </form>
  );
};

export default FileUpload;
