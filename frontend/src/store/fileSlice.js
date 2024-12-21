import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch files from the server
export const fetchFiles = createAsyncThunk('files/fetchFiles', async () => {
  const response = await axios.get('http://localhost:3000/api/files');
  return response.data;
});

// Upload a file
export const uploadFile = createAsyncThunk('files/uploadFile', async (formData, { dispatch }) => {
  await axios.post('http://localhost:3000/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  dispatch(fetchFiles());
  return; 
});

const fileSlice = createSlice({
  name: 'files',
  initialState: {
    list: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

export default fileSlice.reducer;
