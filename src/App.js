import logo from './logo.svg';
import './App.css';
import React, { useState} from 'react';
import DrawingBoard from './components/DrawingBoard';
import FeedbackAccordion from './components/FeedbackAccordion';
import ManageRequests from './components/ManageRequests';
import AppMenu from './components/AppMenu';
import { BrowserRouter as Router, Route, Routes, Link, useHistory } from 'react-router-dom';



function App() {

  return (
	 <Router>
	  <AppMenu/>
		<Routes>
		    <Route exact path="/chaos-shift-ui/" element = {<ManageRequests />} />  
			<Route exact path="/chaos-shift-ui/request" element = {<FeedbackAccordion />} />  
			<Route path="/chaos-shift-ui/drawing" element = {<DrawingBoard brushWidth="8" />} />
	   </Routes>
    </Router>
  );
}

export default App;
