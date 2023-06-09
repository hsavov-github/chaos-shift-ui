import React, { useCallback, useState, KeyboardEvent } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; 
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import UploadCard from './UploadCard';
import PreviewCard from './PreviewCard';


import ReviewBoard from './ReviewBoard';
import FeedbackForm from './FeedbackForm';

function FeedbackRequest() {
  
  const [files, setFiles] = useState([]);
  const [requestDrawerState, setRequestDrawerState] = useState(true);

  const addFilesHandler = ( acceptedFiles)=> {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  };
  
  const drawerWidth = 360;

	const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
	  ({ theme, open }) => ({
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
		  easing: theme.transitions.easing.sharp,
		  duration: theme.transitions.duration.leavingScreen,
		}),
		marginTop: `-360px`,
		...(open && {
			marginTop: `0px`,
		  transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		  }),
		  marginLeft: 0,
		}),
	  }),
	);
  
  
  const [dropDrawerState, setDropDrawerState] = useState(false);

  const toggleRequestDrawer = (e, isOpen) => {
		//setDrawerState(true);
		setRequestDrawerState(isOpen);
    };
  const toggleDropDrawer = (e, isOpen) => {
		//setDrawerState(true);
		setDropDrawerState(isOpen);
    };
	
  const previews = files.map(file => (
	<Grid xs={3}>
		<div key={file.name}>
		  <PreviewCard file ={file.preview} />
		</div>
	</Grid>
  ));
	
  const DrawerHeader = styled('div')(({ theme }) => ({
	  display: 'flex',
	  alignItems: 'center',
	  padding: theme.spacing(0, 1),
	  // necessary for content to be below app bar
	  ...theme.mixins.toolbar,
	  justifyContent: 'flex-start',
	}));

  return (
  <Box sx={{
			  bgcolor: '#dde6eb',
			  boxShadow: 3,
			  borderRadius: 2,
			  p: 2}} className="feedbackRequest">
		<Box>
				<Drawer 
					variant="persistent"
					anchor="top"
					open={requestDrawerState}
					sx={{
					  height: drawerWidth,
					  flexShrink: 0,
					  '& .MuiDrawer-paper': {
						height: drawerWidth,
						boxSizing: 'border-box',
					  },
					}}>
					 <DrawerHeader>
						 <Fab onClick={(e) => toggleRequestDrawer(e, false)}>
								<KeyboardArrowUpIcon /> 
						</Fab>
					</DrawerHeader>
					<Divider />
					<Stack direction="row" spacing={2}>
						<UploadCard addFiles = {addFilesHandler}/> 
						<FeedbackForm/>
					</Stack>
				</Drawer>
		</Box>
		<Main open = {requestDrawerState} >
			{ !requestDrawerState && <Fab onClick={(e) => toggleRequestDrawer(e, !requestDrawerState)}>
					<KeyboardArrowDownIcon /> 
			</Fab>}	  
				<Grid container spacing={4}>
				 {previews}
				</Grid>
		</Main>
			
	</Box>
  );
}

export default FeedbackRequest;
