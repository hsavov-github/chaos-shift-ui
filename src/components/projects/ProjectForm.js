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
import {ProjectRequest} from './model/ProjectRequest';
import UploadAssignment from './UploadAssignment';
import ProjectAssignment from './ProjectAssignment';

function FeedbackForm() {
  const [project, setProject] = useState(new ProjectRequest('','',''));
  const [assignment, setAssignment] = useState(false);
  
  const auth = useAuth();
  
  const handleSave = () => {
	  handleSubmit(project, auth, setProject);
  }
  const handleSend = () => {
	  sendForReview(project, auth);
  }
  function changeTitle(e) {
	  setProject({...project, title: e.target.value});
  }
 
  function changeDescription(e) {
	  setProject({...project, description: e.target.value});
  }
  

  return (

	<Box sx={{ flexGrow: 1}} className="FeedbackForm">
		<Stack direction="column">
			<TextField size="small" label="Title" variant="standard" value={project.title} onChange={changeTitle}/>				
			<UploadAssignment assignment={assignment} setAssignment={setAssignment} />
				{assignment && <ProjectAssignment /> }
			<Stack direction="row" spacing={4}>
			</Stack>
		</Stack>
	</Box >

  );
}

export default FeedbackForm;
