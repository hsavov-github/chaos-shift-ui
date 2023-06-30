import React, { useCallback, useState, useContext,useEffect } from 'react';
import {useAuth} from "./services/UseAuth";
import {handleSubmit, sendForReview} from './services/ReviewConnector';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {authGuest} from './services/LoginService';


function GuestEntry() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("reviewSessionId");
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect( () => {
	   authGuest(sessionId, auth, navigate);
  },[]);
  


  return (

	<div/>

  );
}

export default GuestEntry;
