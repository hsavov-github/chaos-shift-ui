import React, { useCallback, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { useAuth } from "./services/UseAuth";
import {login} from './services/LoginService';

import ReviewBoard from './ReviewBoard';

function LoginForm({request}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();
  
  const handleClick = () => {
	  login(username, password, () => { auth.login(); navigate("/chaos-shift-ui/", { replace: true });});
  }

  return (

	<Box sx={{ flexGrow: 1, maxWidth: 350}} className="FeedbackForm">
		<Stack direction="column">
			<TextField size="small" label="Username" variant="standard" value={username} onChange={(e) => {setUsername(e.target.value)}} />	
			<TextField size="small" label="Password" variant="standard" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
			
			<Stack direction="row" spacing={4}>
				<Button onClick={() => handleClick()}> Login </Button>
			</Stack>
		</Stack>
	</Box >

  );
}

export default LoginForm;
