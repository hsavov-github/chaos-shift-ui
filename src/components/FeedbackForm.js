import React, { useCallback, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; 
import Divider from '@mui/material/Divider';
import InlineEdit from '@atlaskit/inline-edit';

import ReviewBoard from './ReviewBoard';

function FeedbackForm({request}) {
  const [title, setTitle] = useState('');
  const [emails, setEmails] = useState('');
  const [description, setDescription] = useState('');
  
  /* inline example - use later
			<InlineEdit
				defaultValue={description}
				editView={({ errorMessage, ...fieldProps }) => (
				  <TextField size="small" label="Description" variant="standard" onChange={(e) => {setDescription(e.target.value)}} multiline rows={8}  />
				)}
				readView={() => (
				  <div>
					{description || 'Click to enter text'}
				  </div>
				)}
				onConfirm={(value) => {
				  setDescription(value);
				}}
			  />
			*/

  return (

	<Box sx={{ flexGrow: 1}} className="FeedbackForm">
		<Stack direction="column">
			<TextField size="small" label="Title" variant="standard" value={request.title} onChange={(e) => {setTitle(e.target.value)}} />	
			<TextField size="small" label="Recipients" variant="standard" value={emails} onChange={(e) => {setEmails(e.target.value)}} />
			
			
			<TextField size="small" label="Description" variant="standard" onChange={(e) => {}} multiline rows={8}  />
			<Stack direction="row" spacing={4}>
				<Button> Save </Button>
				<Button> Send </Button>
			</Stack>
		</Stack>
	</Box >

  );
}

export default FeedbackForm;
