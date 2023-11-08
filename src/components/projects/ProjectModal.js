import React, { useCallback, useState, useEffect, KeyboardEvent,createContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ProjectForm from './ProjectForm';
import ProjectSegments from './ProjectSegments';
import Stack from '@mui/material/Stack';
import {ProjectRequest} from './model/ProjectRequest';

export const ProjectContext = createContext();

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  maxHeight: '100%',
  overflow: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ProjectModal() {
  const [open, setOpen] = React.useState(false);
  const [project, setProject] = useState(new ProjectRequest('','',''));
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
  <ProjectContext.Provider value={{project, setProject}}>
		<div>
		  <Button onClick={handleOpen}>Add Project</Button>
		  <Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		  >
			<Box sx={style}>
			  <ProjectForm />
			  {project.assignment && <ProjectSegments />}
			</Box>
		  </Modal>
		</div>
	</ProjectContext.Provider>
  );
}