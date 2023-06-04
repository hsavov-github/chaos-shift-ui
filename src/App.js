import logo from './logo.svg';
import './App.css';
import React, { useState} from 'react';
import DrawingBoard from './components/DrawingBoard';


function App() {

  return (
    <div className="App">
	   <DrawingBoard  brushWidth="8"/>
    </div>
  );
}

export default App;
