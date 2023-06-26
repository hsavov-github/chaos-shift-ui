import React, { useCallback, useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "./services/UseAuth";
import {loadReviews} from './services/ReviewConnector';

import {getDummyRequests} from './model/ReviewRequest';

function ManageRequests() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const auth = useAuth();
  const [collected, setCollected] = useState(getDummyRequests());
  const [filtered, setFiltered] = useState(getDummyRequests());
  
  useEffect(() => {
	const result = loadReviews(null, auth);
	result.then( (value) => {setCollected(value); setFiltered(value)});
  },[])
  
  const [includeActive, setIncludeActive] = useState(true);
  const [includeSaved, setIncludeSaved] = useState(true);
  const [includeApproved, setIncludeApproved] = useState(false);
  
  const [emails, setEmails] = useState('');
  const [description, setDescription] = useState('');
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  
  const isEnabled = (isActive) => {
	 return isActive ? 'outlined' : 'filled'
  }
  
  const filterProjects = (e, value) => {
	  const updated = value;
	  loadReviews(null, auth).then( fullList => {
		  setSearch(updated);
		  if(!updated || (updated.length === 0)) {
			  setFiltered(fullList);
		  } else {
			  const newRows = fullList.filter( request => request.title.includes(updated));
			  setFiltered(newRows);
		  }
	  });
  }
  
  const handleRowClick = (e, id) => {
	  navigate('/chaos-shift-ui/request?reviewReqId=' + id);
  }
  
  const searchField = (params) => {
	  return <TextField  {...params}  label="Search" variant="outlined" value={search} />
  }

   const table = (
	   <TableContainer component={Paper}>
		  <Table sx={{ minWidth: 350 }} aria-label="simple table">
			<TableHead>
			  <TableRow sx={{  backgroundColor: '#dde6eb' }}>
				<TableCell>Review</TableCell>
				<TableCell align="right">Status</TableCell>
			  </TableRow>
			</TableHead>
			<TableBody>
			  {(filtered && filtered.length > 0) && filtered.map((row) => (
				<TableRow
				  key={row.title}
				  sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#dde6e4'}  }}
				  onClick = {(e) => handleRowClick(e, row.id)}
				>
				  <TableCell component="th" scope="row">
					{row.title}
				  </TableCell>
				  <TableCell align="right">{row.status}</TableCell>
				  
				</TableRow>
			  ))}
			</TableBody>
		  </Table>
    </TableContainer>
   )


  return (

	<Box sx={{
			  boxShadow: 3,
			  borderRadius: 2,
			  p: 2}} className="ManageRequests">
		<Stack direction="column" spacing={2}>
		
		<Autocomplete
			id="free-solo-demo"
			freeSolo
			onChange={(e, value) => {filterProjects(e, value)}}
			options={collected.map((option) => option.title)}
			renderInput={searchField} />
			
			<Stack direction="row" spacing={2}>
				 <Chip label="Saved" variant={isEnabled(includeActive)} onClick={() => setIncludeActive(!includeActive)} />
				 <Chip label="Active" variant={isEnabled(includeSaved)} onClick={() => setIncludeSaved(!includeSaved)} />
				 <Chip label="Approved" variant={isEnabled(includeApproved)} onClick={() => setIncludeApproved(!includeApproved)} />
			</Stack>
			{table}			
		</Stack>
	</Box >

  );
}

export default ManageRequests;
