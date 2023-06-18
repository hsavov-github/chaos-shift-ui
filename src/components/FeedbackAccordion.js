import React, { useCallback, useState, KeyboardEvent } from 'react';
import { useSearchParams } from "react-router-dom";
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
import {responsiveScreen} from './utils/ScreenSize';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'


import ReviewBoard from './ReviewBoard';
import FeedbackForm from './FeedbackForm';
import PreviewTable from './PreviewTable';
import {getDummyRequestByTitle, ReviewRequest} from './model/ReviewRequest';



function FeedbackAccordion() {
  const [searchParams, setSearchParams] = useSearchParams();
  const reviewBody = getDummyRequestByTitle(searchParams.get("reviewReqId"));
  const [reviewRequest, setReviewRequest] = useState(reviewBody ? reviewBody : new ReviewRequest('','',''))
  
  const [files, setFiles] = useState([]);
  const [requestPanelState, setRequestPanelState] = useState(true);
  const [previewPanelState, setPreviewPanelState] = useState(true);
  const [previewTableState, setPreviewTableState] = useState(true);

  const addFilesHandler = ( acceptedFiles)=> {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  };
  
  const [expanded, setExpanded] = React.useState(false);

  const anyFiles = () => {
    return files.length > 0;
  };
	
  const previews = files.map(file => (
	<Box sx= {{padding: '20px'}}>
		  <PreviewCard  key={file.name} file ={file} />
	</Box>
  ));	

  return (
  <Box sx={{
			  bgcolor: '#dde6eb',
			  boxShadow: 3,
			  borderRadius: 2 }} className="feedbackRequest">
			  
		<Accordion expanded={requestPanelState} onChange = {() => setRequestPanelState(!requestPanelState)}>
			<AccordionSummary
			  expandIcon={<ExpandMoreIcon />}
			  aria-controls="panel1bh-content"
			  id="panel1bh-header"
			>
			</AccordionSummary>
			<AccordionDetails>
				 <Stack direction="row" spacing={2}>
							<FeedbackForm request = {reviewRequest} />
				</Stack>
			</AccordionDetails>
      </Accordion>
	  { anyFiles() && <Accordion expanded={previewPanelState} onChange = {() => setPreviewPanelState(!previewPanelState)}>
			<AccordionSummary
			  expandIcon={<ExpandMoreIcon />}
			  aria-controls="panel2bh-content"
			  id="panel2bh-header"
			/>
			<AccordionDetails>
				<Carousel responsive={responsiveScreen}>
				 {previews}
				</Carousel>
			</AccordionDetails>
      </Accordion> 
	  }	  
	  <Accordion expanded={previewTableState} onChange = {() => setPreviewTableState(!previewTableState)}>
			<AccordionSummary
			  expandIcon={<ExpandMoreIcon />}
			  aria-controls="panel2bh-content"
			  id="panel2bh-header"
			/>
			<AccordionDetails>
				<PreviewTable/>
			</AccordionDetails>
      </Accordion> 
	</Box>
  );
}

export default FeedbackAccordion;
