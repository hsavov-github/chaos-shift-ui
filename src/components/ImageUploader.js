import React, { useState } from 'react';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';

const ImageUploader = ({sharedImage, onImageChange}) => {
	// Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
	
  return (
    <div>
		<Button icon="pi pi-upload" onClick={handleClick} />
		<input type="file" ref={hiddenFileInput} style={{display: 'none'}} onChange={(e) => onImageChange(e)} />
	</div>
	
  );
};

export default ImageUploader;
