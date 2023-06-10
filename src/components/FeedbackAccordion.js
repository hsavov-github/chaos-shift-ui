import React, { useCallback, useState, KeyboardEvent } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; 
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UploadCard from './UploadCard';
import PreviewCard from './PreviewCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'


import ReviewBoard from './ReviewBoard';
import FeedbackForm from './FeedbackForm';

function FeedbackAccordion() {
  
  const [files, setFiles] = useState([]);
  const [requestPanelState, setRequestPanelState] = useState(true);
  const [previewPanelState, setPreviewPanelState] = useState(true);

  const addFilesHandler = ( acceptedFiles)=> {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  };
  
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

	
  const responsive = {
	  superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 3000 },
		items: 5
	  },
	  desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3
	  },
	  tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2
	  },
	  mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1
	  }
  };
	
  const previews = files.map(file => (
	<Box sx= {{padding: '20px'}}>
		  <PreviewCard  key={file.name} file ={file.preview} />
	</Box>
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
			  
		<Accordion expanded={requestPanelState === true} onChange = {() => setRequestPanelState(!requestPanelState)}>
			<AccordionSummary
			  expandIcon={<ExpandMoreIcon />}
			  aria-controls="panel1bh-content"
			  id="panel1bh-header"
			>
			</AccordionSummary>
			<AccordionDetails>
				 <Stack direction="row" spacing={2}>
							<UploadCard addFiles = {addFilesHandler}/> 
							<FeedbackForm/>
				</Stack>
			</AccordionDetails>
      </Accordion>
	  { (files.length > 0) && <Accordion expanded={previewPanelState === true} onChange = {() => setRequestPanelState(!previewPanelState)}>
			<AccordionSummary
			  expandIcon={<ExpandMoreIcon />}
			  aria-controls="panel2bh-content"
			  id="panel2bh-header"
			/>
			<AccordionDetails>
				<Carousel responsive={responsive}>
				 {previews}
				</Carousel>
			</AccordionDetails>
      </Accordion> 
	  }	  
	</Box>
  );
}

export default FeedbackAccordion;
