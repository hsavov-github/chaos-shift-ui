import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PreviewCard from './PreviewCard';

function ReviewBoard() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleThumbnailClick = (e) => {
	//history.push('/second-page', { inputValue }});
	 navigate('/chaos-shift-ui/drawing');
  };

  const previews = files.map(file => (
    <div key={file.name}>
	  <PreviewCard file ={file.preview} />
    </div>
  ));

  return (
    <div>
	 <div {...getRootProps()}>
        <input {...getInputProps()} />
		<p>Drag and drop your images here, or click to select files</p>
      </div>
      <aside>
	   <Stack direction="column" spacing={1}>
        {previews}
		</Stack>
      </aside>
	 
    </div>
  );
}

export default ReviewBoard;
