import React from 'react';

function FileViewer({ fileName }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/files/${fileName}`);
        const data = await response.json();
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching file content:', error);
      }
    };

    fetchFileContent();
  }, [fileName]);

  return (
    <div>
      <h2>Viewing File: {fileName}</h2>
      <pre>{content}</pre>
    </div>
  );
}

export default FileViewer;
