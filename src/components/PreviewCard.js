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


export default function PreviewCard( {preview} ) {
	const navigate = useNavigate();
	

	const handleThumbnailClick = (e) => {
		//history.push('/second-page', { inputValue }});
		 navigate('/chaos-shift-ui/drawing?previewId=' + preview.id,  { state: { data: preview.file } });
	  };
  
  
  return (
    <Card className="card">
	<CardActionArea onClick = {handleThumbnailClick}>
		  <CardMedia
			sx={{ height: 100 }}
			image={preview.file.preview}
			title="upload file"
		  />
	  </CardActionArea>
    </Card>
  );
}