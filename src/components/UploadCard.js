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


export default function UploadCard({addFiles}) {
	const onDrop = useCallback(acceptedFiles => {
		addFiles(acceptedFiles);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });
  
  
  return (
  <div {...getRootProps()}>
        <input {...getInputProps()} />
		<Card sx={{ maxWidth: 280, height: 360 }}>
			<CardMedia
				sx={{ height: 110 }}
				image="/chaos-shift-ui/drag-drop.svg"
				title="green iguana"
			  />
		  <CardContent>
			<Typography variant="body2" color="text.secondary">
				Upload your image.
			</Typography>
		  </CardContent>
		</Card>
	</div>
  );
}