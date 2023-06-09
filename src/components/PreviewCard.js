import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


export default function PreviewCard({ file }) {
	const navigate = useNavigate();
	

	const handleThumbnailClick = (e) => {
		//history.push('/second-page', { inputValue }});
		 navigate('/chaos-shift-ui/drawing');
	  };
  
  
  return (
    <Card className="card" sx={{ 
		maxWidth: 280,
		'&:hover': {
		  transform: 'scale(1.2)',
		} 
	}}>
      <CardMedia
        sx={{ height: 100 }}
        image={file}
        title="upload file"
      />
      <CardContent>
        <Typography variant="body7" color="text.secondary">
         <TextField label="Title" onChange={(e) => {}} variant="standard" />
		 <TextField label="Description" onChange={(e) => {}} variant="standard" multiline  rows={4} />
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick = {handleThumbnailClick}>Edit </Button>
		<Button> Delete</Button>
      </CardActions>
    </Card>
  );
}