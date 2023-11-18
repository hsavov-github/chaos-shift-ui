import React, { useCallback, useState, useContext, useEffect } from 'react';
//import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CircularProgress from '@mui/material/CircularProgress';
import UploadCard from '../UploadCard';
import PreviewCard from '../PreviewCard';
import {useNavigate } from "react-router-dom";
import {useAuth} from "../services/UseAuth";
import {loadImage, handleSubmit, generateSuggestion} from './services/FileConnector';
import {ProjectContext} from './ProjectModal';


const dummySegments = [
			  {
				type:'Exterior',
				prompt:'Single-family house in Shanghai, 2 floors, modern style, natural materials: natural stone, wood Big windows towards south, small windows towards north, medium size windows towards east and west.Entrance from north, south facing a big outdoor space, garden with outdoor seatings.',
				fileId:'a81ee18c4c8de0c576c75ab90c2cf9d7e9a15f810b9c533917725e58a76e37b0.jpg',			
			  },
			  {
				type:'Living room',
				prompt:'Single-family house in Shanghai, 2 floors, modern style, natural materials: natural stone, wood Big windows towards south, small windows towards north, medium size windows towards east and west.Entrance from north, south facing a big outdoor space, garden with outdoor seatings.',
				fileId:'22e33710d41a311d0e9a7d8c8e5d5bdd68a0d1fcd68d55bf74a7741927321a07.jpg',			
			  },
			  {
				type:'Bathroom',
				prompt:'Single-family house in Shanghai, 2 floors, modern style, natural materials: natural stone, wood Big windows towards south, small windows towards north, medium size windows towards east and west.Entrance from north, south facing a big outdoor space, garden with outdoor seatings.',
				fileId:'30147392c5a9165de8a8ba501fa5e5d05cb5ca45e874fd5ffdc47e1d3446452d.jpg',			
			  },
			]
//a81ee18c4c8de0c576c75ab90c2cf9d7e9a15f810b9c533917725e58a76e37b0.jpg
//30147392c5a9165de8a8ba501fa5e5d05cb5ca45e874fd5ffdc47e1d3446452d.jpg


async function createData(segment, auth) {
	return await loadImage(segment.fileId, auth).then( img => {
		  return {
			title: segment.type,
			data: 
			  {
				prompt:segment.prompt,
				fileId:segment.fileId,
				image:img.preview,
			  }
		  };
	});
}


function Row( props) {
  const auth = useAuth();
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState([]);
  
  const loadFileOther = (id, auth) => {
	loadImage(id, auth).then( img => setImage(img.preview))
}

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.data && 
						<Box sx={{ flexGrow: 1}}>
							<TextField label="Prompt" fullWidth multiline maxRows={4} variant="standard" value={row.data.prompt}/>
							<Card className="card">
							<CardActionArea>
								  <CardMedia
									sx={{ height: 300 }}
									image={row.data.image.preview}
									title="upload file"
								  />
							  </CardActionArea>
							</Card>
						</Box>
                      }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function getHeaders() {
	return ( <TableRow>
				<TableCell />
				<TableCell> Preview </TableCell>
				<TableCell> Title</TableCell>
				<TableCell> Status</TableCell>
			</TableRow>
	)
}


	


export default function ProjectSegments() {
  const [rows, setRows] = useState();
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(ProjectContext);
  useEffect(() => {
	   console.log(context.project);
	  },[context.project]);
  //const defaultData = useState(model);
  //const context = useContext(FeedbackFormContext);
  
 
 
 function generateSummary() {
	 /* const model = [
	  createData('Exterior', auth),
	  createData('Electricity', auth),
	  createData('Interior', auth)
	 ];*/
	 /*
	 const segmentPromises = dummySegments.map(segment => {
		 return createData(segment, auth);
	 });
	 Promise.all(segmentPromises).then((values) => {
		setRows(values);
	 });*/
	 setIsLoading(true);
	 const segmentPromises = context.project.selectedAssignmentItems.flatMap( assignmentItem => {
             return generateSuggestion(assignmentItem.description, auth)
             .then(async response => {
                      return await Promise.all(response.flatMap(elm => {
                         const imgPromise = loadImage(elm.imageResponse.data[0].url, auth);
                         return imgPromise.then(image => {
                             return {
                                        title: elm.title,
                                        data:
                                            {
                                                prompt:elm.description,
                                                fileId:elm.imageResponse.data[0].url,
                                                image:image
                                            }
                                 };
                          });
                      }));
                 })
             });
	Promise.all(segmentPromises).then((values) => {
			const resolved = values.flat();
			setRows(resolved);
			setIsLoading(false);
	});
	 
 }
 
 function sendForReview() {
     const previews = rows.map( row => {
     return {
              fileId: row.data.fileId,
              title: row.title,
              description: row.data.prompt,
            };
          });
	 const request = {
		 "title":context.project.title,
		 "description": context.project.selectedAssignmentItems[0].description,
		 "status":"",
		 "previews":previews,
	 };

	 const requestReviewResponse = handleSubmit(request, auth);
	 requestReviewResponse.then( response => {
		 navigate("/chaos-shift-ui/request?reviewReqId=" + /*"0aae58a0-6374-4df2-9b40-f7a684df889c"*/ response.id);
	 });
	 
	 
 }
  
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
		<TableRow>
		   
            <TableCell colSpan="4" align="center">
                {isLoading && <Box sx={{ display: 'flex' }}>
                					<CircularProgress />
                				</Box>
                }
				<Button onClick={generateSummary}> Generate summary </Button>
			</TableCell>
			
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.map((element) => 
			  {     console.log(element);
					return <Row key={element.title} row={element} />
			  })
		}
		{rows && ( 
			<TableRow>
				<TableCell colSpan="4" align="center">
					<Button onClick={sendForReview}> Send for review  </Button>
				</TableCell>
			</TableRow>
		)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}