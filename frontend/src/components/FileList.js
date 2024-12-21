import React from 'react';
import { useSelector } from 'react-redux';
import { FileRow } from './FlleRow';
const FileList = () => {
  const files = useSelector((state) => state.files.list);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Uploaded Files</h2>
      <ul className="list-disc pl-6">
        {files.map((file) => <FileRow file = {file}/>)}
      </ul>
    </div>
  );
};

export default FileList;
