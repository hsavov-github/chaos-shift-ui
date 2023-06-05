import logo from './logo.svg';
import './App.css';
import React, { useState} from 'react';
import DrawingBoard from './components/DrawingBoard';
import FeedbackRequest from './components/FeedbackRequest';
import { BrowserRouter as Router, Route, Routes, Link, useHistory } from 'react-router-dom';



function App() {

  return (
	 <Router>
	  <Link to="/chaos-shift-ui/">Public</Link>
		<Routes>
			<Route exact path="/chaos-shift-ui/" element = {<FeedbackRequest />} />  
			<Route path="/chaos-shift-ui/drawing" element = {<DrawingBoard brushWidth="8" />} />
	   </Routes>
    </Router>
  );
}

export default App;
