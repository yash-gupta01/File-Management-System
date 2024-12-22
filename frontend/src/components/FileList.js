// src/components/FileList.js
import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from '../store/fileSlice';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FileDownload from './FileDownload';
import { convertBytes } from '../util/util';

const FileList = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.list);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  const columns = [
    { field: 'title', headerName: 'Title', flex: 2 },
    {
      field: 'size',
      headerName: 'File Size',
      flex: 1,
      renderCell: (params) => convertBytes(params.row.size),
    },
    {
      field: 'view',
      headerName: 'View',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/view', { state: { fileId: params.row.id, fileName: params.row.title } })}
        >
          View
        </Button>
      ),
    },
    {
      field: 'download',
      headerName: 'Download',
      flex: 1,
      renderCell: (params) => (
        <FileDownload fileId={params.row.id} fileName={params.row.title} />
      ),
    },
  ];

  const rows = files.map((file) => ({
    id: file._id,
    title: file.originalName,
    size: file.size,
  }));

  return (
    <div className="p-4">
      <h2>My Files</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={8}
        className="max-h-[50vh]"
      />
    </div>
  );
};

export default FileList;
