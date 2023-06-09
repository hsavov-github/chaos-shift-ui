import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
		<Card sx={{ width: 280, height: 240 }}>
			
		  <CardContent>
			<FileUploadIcon/>
			<Typography variant="body2" color="text.secondary">
				Upload your previews here
			</Typography>
		  </CardContent>
		</Card>
	</div>
  );
}