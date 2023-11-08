import React, { useCallback, useState, useEffect, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import {ProjectContext} from './ProjectModal';
import {useAuth} from "../services/UseAuth";
import {uploadAssignment} from './services/FileConnector';



export default function UploadAssignment() {
	const auth = useAuth();
	const context = useContext(ProjectContext);
    useEffect(() => {
	   console.log(context.project);
	  },[context.project]);
	const [isLoading, setIsLoading] = useState(false); 
	
	const onDrop = useCallback(acceptedFiles => {
		setIsLoading(true);
		uploadAssignment(acceptedFiles[0], context.project.categories, auth).then( response =>
		{
			const assignmentBody = JSON.parse(response);
			context.setProject({...context.project, assignment:assignmentBody.items});
			setIsLoading(false);
		});
	});

	const { getRootProps, getInputProps } = useDropzone({ onDrop });
  
  
  return (
  <div  {...getRootProps()}>
        <input {...getInputProps()} />
		<Box sx={{'&:hover': {backgroundColor: 'gray'} }}>
		 <Stack sx ={{marginLeft:'40%', marginTop:'5%'}} direction="row">
			 {isLoading && <Box sx={{ display: 'flex' }}>
					<CircularProgress />
				</Box>
			 }
			<FileUploadIcon sx ={{color:'green', }}/>
			<Typography variant="body2" color="text.secondary">
				Upload your files here.
			</Typography>
		</Stack>
		</Box>
	</div>
  );
}