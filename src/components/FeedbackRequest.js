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

  const addFilesHandler = ( acceptedFiles)=> {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  };
  
  const [requestDrawerState, setRequestDrawerState] = useState(false);
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
	<Grid xs={4}>
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
  <Box sx={{ flexGrow: 1}} className="feedbackRequest">
  <Stack spacing={2}  >
		  <Box>
				<Fab onClick={(e) => toggleDropDrawer(e, !requestDrawerState)}>
									<KeyboardArrowDownIcon /> 
				</Fab>
			<Drawer 
				variant="persistent"
				anchor="top"
				open={dropDrawerState}>
					<ReviewBoard />
					<Divider />
						 <Fab onClick={(e) => toggleDropDrawer(e, false)}>
								<KeyboardArrowUpIcon /> 
						</Fab>
			</Drawer>	
		 </Box>
		
		<Box>
		  <Fab onClick={(e) => toggleRequestDrawer(e, !requestDrawerState)}>
				<ChevronLeftIcon /> 
		  </Fab>
				<Drawer 
					variant="persistent"
					anchor="right"
					open={requestDrawerState}>
					 <DrawerHeader>
						 <Fab onClick={(e) => toggleRequestDrawer(e, false)}>
								<ChevronRightIcon /> 
						</Fab>
					</DrawerHeader>
					<Divider />
					<FeedbackForm/>
				</Drawer>
		</Box>
		<Grid container spacing={2}>
		<Grid xs={4}>
			<UploadCard addFiles = {addFilesHandler}/> 
		 </Grid>
		 {previews}
		</Grid>
		
	</Stack>		
			
	</Box>
  );
}

export default FeedbackRequest;
