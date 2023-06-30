import logo from './logo.svg';
import './App.css';
import React, { useState} from 'react';
import LoginForm from './components/LoginForm';
import DrawingBoard from './components/DrawingBoard';
import FeedbackAccordion from './components/FeedbackAccordion';
import GuestEntry from './components/GuestEntry';
import ManageRequests from './components/ManageRequests';
import ProtectedRoute, {InternalView} from './components/ProtectedRoute';
import AppMenu from './components/AppMenu';
import {AuthProvider} from './components/services/UseAuth'
import { BrowserRouter as Router, Route, Routes, Link, useHistory } from 'react-router-dom';



function App() {

  return (
  
		 <Router>
		 <AuthProvider>
		  <AppMenu/>
			<Routes>
				
				<Route exact path="/chaos-shift-ui/login" element = {<LoginForm />} />
				<Route path="/chaos-shift-ui/guest" element = {<GuestEntry />} />				
				GuestEntry
				<Route exact path="/chaos-shift-ui/" element = {<InternalView> <ManageRequests /> </InternalView>} />  
				<Route exact path="/chaos-shift-ui/request" element = {<ProtectedRoute> <FeedbackAccordion /> </ProtectedRoute>} />  
				<Route path="/chaos-shift-ui/drawing" element = {<ProtectedRoute> <DrawingBoard brushWidth="8" /> </ProtectedRoute>} />
		   </Routes>
		 </AuthProvider>
		</Router>
	
  );
}

export default App;
