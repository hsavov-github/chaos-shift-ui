import React, { useCallback, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; 
import Divider from '@mui/material/Divider';

import ReviewBoard from './ReviewBoard';

function FeedbackForm() {
  const [title, setTitle] = useState('');
  const [emails, setEmails] = useState('');
  const [description, setDescription] = useState('');

  return (

	<Box sx={{ flexGrow: 1, margin: '50px',  width: 300}} className="FeedbackForm">
		<Stack direction="column" spacing={2}>
			<TextField  size="small" label="Title" variant="standard" value={title} onChange={(e) => {setTitle(e.target.value)}} />
			<TextField  size="small" label="Recipients" variant="standard" value={emails} onChange={(e) => {setEmails(e.target.value)}} />
			<TextField  size="small" label="Description" variant="standard" onChange={(e) => {}} multiline rows={4}  />
			<Stack direction="row" spacing={4}>
				<Button> Save </Button>
				<Button> Send </Button>
			</Stack>
		</Stack>
	</Box >

  );
}

export default FeedbackForm;
