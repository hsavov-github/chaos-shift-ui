import React, { useCallback, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; 
import Divider from '@mui/material/Divider';

import ReviewBoard from './ReviewBoard';

function FeedbackRequest() {
  const [title, setTitle] = useState('');
  const [emails, setEmails] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Box sx={{ flexGrow: 1}} className="feedbackRequest">
		<Stack  direction="row" spacing={2}>
				<Box sx={{ flexGrow: 1, margin: '50px',  width: 300}} className="feedbackRequest">
					<Stack direction="column" spacing={2}>
						<TextField label="Title" variant="standard" value={title} onChange={(e) => {setTitle(e.target.value)}} />
						<TextField label="Recipients" variant="standard" value={emails} onChange={(e) => {setEmails(e.target.value)}} />
						<TextField label="Description" variant="standard" onChange={(e) => {}} multiline rows={8}  />
						<Stack direction="row" spacing={4}>
						<Button> Save </Button>
						<Button> Send </Button>
					</Stack>
					</Stack>
				</Box >
			<ReviewBoard />
		</Stack>
    </Box>
  );
}

export default FeedbackRequest;
