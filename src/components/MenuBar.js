import React, { useState } from 'react';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import Operations from'./OperationsState';

const MenuBar = ({handlePickOperation, zoomIn, zoomOut, saveSVG, savePNG }) => {
	// menu
  const [collapsed, setCollapsed] = useState(false);
	// Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
	
  return (
    <div className="controls" style={{ position: 'relative', zIndex: collapsed ? 0 : 1 }}>
	    <Button onClick={() => setCollapsed(!collapsed)} icon={collapsed ? "pi pi-angle-double-up" : "pi pi-angle-double-up"}/>
		
		
		 {!collapsed && (
		 <div style={{ display: 'flex', flexDirection: 'column' }}>
			<Button icon="pi pi-search-plus" onClick={zoomIn}/>
			<Button icon="pi pi-search-minus" onClick={zoomOut}/>
			<Button icon="pi pi-cloud-download" onClick={saveSVG}/>
			<Button icon="pi pi-cloud-download" onClick={savePNG}/>
			  
			<Button icon="pi pi-pencil" onClick={() => handlePickOperation(Operations.Draw)}/>
			<Button icon="pi pi-eraser" onClick={() => handlePickOperation(Operations.Delete)}/>
			<Button icon="pi pi-file-edit" onClick={() => handlePickOperation(Operations.Write)}/>
			<Button icon="pi pi-search-plus" onClick={() => handlePickOperation(Operations.ZoomIn)}/>
			<Button icon="pi pi-search-minus" onClick={() => handlePickOperation(Operations.ZoomOut)}/>
		 </div>
		)}	
			
	  </div>
	
  );
};

export default MenuBar;
