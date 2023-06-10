import React, { useCallback, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';


import ReviewBoard from './ReviewBoard';

function ManageRequests() {
  const [search, setSearch] = useState('');
  
  const [includeActive, setIncludeActive] = useState(true);
  const [includeSaved, setIncludeSaved] = useState(true);
  const [includeApproved, setIncludeApproved] = useState(false);
  
  const [emails, setEmails] = useState('');
  const [description, setDescription] = useState('');
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  
  const isEnabled = (isActive) => {
	 return isActive ? 'outlined' : 'filled'
  }
  
  const searchField = (params) => {
	  return <TextField  {...params}  label="Search" variant="outlined" value={search} onChange={(e) => {setSearch(e.target.value)}} />
  }
  
  const exampleProjects = [
  { title: 'The Shanghai Redemption', year: 1994 },
  { title: 'The Poohfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Chineese Knight', year: 2008 },
  { title: '12 Angry Chineesem Men', year: 1957 },
  { title: "Xin's List", year: 1993 },
  { title: 'Chineese Fiction', year: 1994 }
  ]

  return (

	<Box sx={{ flexGrow: 1, margin: '50px',  width: 300}} className="ManageRequests">
		<Stack direction="column" spacing={2}>
		
		<Autocomplete
			id="free-solo-demo"
			freeSolo
			options={exampleProjects.map((option) => option.title)}
			renderInput={searchField} />
			
			<Stack direction="row" spacing={2}>
				 <Chip label="Saved" variant={isEnabled(includeActive)} onClick={() => setIncludeActive(!includeActive)} />
				 <Chip label="Active" variant={isEnabled(includeSaved)} onClick={() => setIncludeSaved(!includeSaved)} />
				 <Chip label="Approved" variant={isEnabled(includeApproved)} onClick={() => setIncludeApproved(!includeApproved)} />
			</Stack>		
		</Stack>
	</Box >

  );
}

export default ManageRequests;
