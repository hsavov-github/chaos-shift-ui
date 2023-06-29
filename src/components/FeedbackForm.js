import React, { useCallback, useState, useContext,useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; 
import Divider from '@mui/material/Divider';
import InlineEdit from '@atlaskit/inline-edit';
import {useAuth} from "./services/UseAuth";
import {handleSubmit, sendForReview} from './services/ReviewConnector';

import ReviewBoard from './ReviewBoard';
import {FeedbackFormContext} from './FeedbackAccordion';

function FeedbackForm() {
   const context = useContext(FeedbackFormContext);
   useEffect(() => {
	   console.log(context.request);
	  },[context.request]);
  //const [title, setTitle] = useState(request.title);
  //const [emails, setEmails] = useState('');
  //const [description, setDescription] = useState(request.description);
  const auth = useAuth();
  
  const handleSave = () => {
	  handleSubmit(context.request, auth, context.setRequest);
  }
  const handleSend = () => {
	  sendForReview(context.request, auth);
  }
  function changeTitle(e) {
	  context.setRequest({...context.request, title: e.target.value});
  }
  function changeEmails(e) {
	  context.setRequest({...context.request, emails: e.target.value});
  }
  function changeDescription(e) {
	  context.setRequest({...context.request, description: e.target.value});
  }
  
  
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
			<TextField size="small" label="Title" variant="standard" value={context.request.title} onChange={changeTitle}/>	
			<TextField size="small" label="Recipients" variant="standard" value={context.request.emails} onChange={changeEmails} />
			
			
			<TextField size="small" label="Description" variant="standard" value={context.request.description} onChange={changeDescription} multiline rows={8}  />
			<Stack direction="row" spacing={4}>
				<Button onClick={() => handleSave()}> Save </Button>
				<Button onClick={() => handleSend()}> Send </Button>
			</Stack>
		</Stack>
	</Box >

  );
}

export default FeedbackForm;
