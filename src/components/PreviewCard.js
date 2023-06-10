import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { CardActionArea } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';


export default function PreviewCard({ file }) {
	const navigate = useNavigate();
	

	const handleThumbnailClick = (e) => {
		//history.push('/second-page', { inputValue }});
		 navigate('/chaos-shift-ui/drawing');
	  };
  
  
  return (
    <Card className="card" sx={{ 
		maxWidth: 280,
		minWidth: 280,
		flexShrink: 0,
		'&:hover': {
		  transform: 'scale(1.05)',
		} 
	}}>
	<CardContent>
	
        <Typography variant="body7" color="text.secondary">
			<IconButton onClick={e => {}}>
                          <HighlightOffOutlinedIcon />
               </IconButton>
			 <TextField size="small" label="Title" onChange={(e) => {}} variant="standard" />
			 <TextField size="small" label="Description" onChange={(e) => {}} variant="standard" multiline  rows={4} />
        </Typography>
     </CardContent>
	
	<CardActionArea onClick = {handleThumbnailClick}>
		  <CardMedia
			sx={{ height: 100 }}
			image={file}
			title="upload file"
		  />
	  </CardActionArea>
    </Card>
  );
}