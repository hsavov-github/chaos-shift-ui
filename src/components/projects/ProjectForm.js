import React, { useCallback, useState, useContext,useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; 
import Divider from '@mui/material/Divider';
import InlineEdit from '@atlaskit/inline-edit';
import {useAuth} from "../services/UseAuth";
import {handleSubmit, sendForReview} from '../services/ReviewConnector';
import {ProjectContext} from './ProjectModal';
import UploadAssignment from './UploadAssignment';
import ProjectAssignment from './ProjectAssignment';
import AssignmentCategoryPicker from './AssignmentCategoryPicker';

function FeedbackForm() {
  const context = useContext(ProjectContext);
   useEffect(() => {
	   console.log(context.project);
	  },[context.project]);
  //const [assignment, setAssignment] = useState(false);
  
  const auth = useAuth();
  
  const handleSave = () => {
	  handleSubmit(context.project, auth, context.setProject);
  }
  const handleSend = () => {
	  sendForReview(context.project, auth);
  }
  function changeTitle(e) {
	  context.setProject({...context.project, title: e.target.value});
  }
 
  function changeDescription(e) {
	  context.setProject({...context.project, description: e.target.value});
  }
  

  return (

	<Box sx={{ flexGrow: 1}} className="FeedbackForm">
		<Stack direction="column">
			<TextField size="small" label="Title" variant="standard" value={context.project.title} onChange={changeTitle}/>
			<AssignmentCategoryPicker />
			<UploadAssignment />
				{context.project.assignment && <ProjectAssignment /> }
			<Stack direction="row" spacing={4}>
			</Stack>
		</Stack>
	</Box >

  );
}

export default FeedbackForm;
