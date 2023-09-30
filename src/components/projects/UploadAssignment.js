import React, { useCallback, useState, useEffect, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Stack from '@mui/material/Stack';



export default function UploadAssignment({assignment, setAssignment}) {
	
	const onDrop = useCallback(acceptedFiles => {
		setAssignment(true);
	});

	const { getRootProps, getInputProps } = useDropzone({ onDrop });
  
  
  return (
  <div  {...getRootProps()}>
        <input {...getInputProps()} />
		<Box sx={{'&:hover': {backgroundColor: 'gray'} }}>
		 <Stack sx ={{marginLeft:'40%', marginTop:'5%'}} direction="row">
			<FileUploadIcon sx ={{color:'green', }}/>
			<Typography variant="body2" color="text.secondary">
				Upload your files here.
			</Typography>
		</Stack>
		</Box>
	</div>
  );
}