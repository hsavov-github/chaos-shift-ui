import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FileUploadIcon from '@mui/icons-material/FileUpload';


export default function UploadCard({addFiles}) {
	const onDrop = useCallback(acceptedFiles => {
		addFiles(acceptedFiles);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });
  
  
  return (
  <div {...getRootProps()}>
        <input {...getInputProps()} />
		<Box sx={{ maxWidth: '150px', '&:hover': {backgroundColor: 'gray'} }}>
			<FileUploadIcon/>
			<Typography variant="body2" color="text.secondary">
				Upload your files here.
			</Typography>
		</Box>
	</div>
  );
}