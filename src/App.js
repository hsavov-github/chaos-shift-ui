import logo from './logo.svg';
import './App.css';
import {INITIAL_VALUE, ReactSVGPanZoom, TOOL_NONE, fitSelection, zoomOnViewerCenter, fitToViewer} from 'react-svg-pan-zoom';
import React, { useState, useEffect, useRef } from 'react';
import { saveAs } from "file-saver";
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';

const Operations = Object.freeze({
		Draw: Symbol("Draw"),
		Write: Symbol("Write"),
		Delete: Symbol("Delete"),
		ZoomIn: Symbol("ZoomIn"),
		ZoomOut: Symbol("ZoomOut")
	})
const Cursors = new Map([
  [Operations.Draw, 'crosshair'],
  [Operations.Write, 'text'],
  [Operations.Delete, 'not-allowed'],
  [Operations.ZoomIn, 'zoom-in'],
  [Operations.ZoomOut, 'zoom-out'],
]);

function DrawingBoard({ imageUrl, brushWidth }) {
  const svgRef = useRef(null); // reference to the svg element
  const schemaURL = imageUrl;
  const [enrichment, setEnrichment] = useState({
		  paths: [],
		  points: [],
		  texts: [],
		});
  const updatePaths = (enrichment, newPaths) => ({
    ...enrichment,
    paths: newPaths
  });
  const updatePoints = (enrichment, newPoints) => ({
    ...enrichment,
    points: newPoints
  });
  const updateTexts = (enrichment, newTexts) => ({
    ...enrichment,
    texts: newTexts
  });
  
  //const [paths, setPaths] = useState([]); // array of paths to draw on the svg
  //const [points, setPoints] = useState([]); // array of points to draw the current path
  const [drawing, setDrawing] = useState(false); // flag to indicate if the user is drawing
  const [offsetX, setOffsetX] = useState(0); // offset for the x coordinate of the points
  const [offsetY, setOffsetY] = useState(0); // offset for the y coordinate of the points
  const [controlType, setControlType] = useState(Operations.Draw); // offset for the y coordinate of the points
  const [cursorStyle, setCursorStyle] = useState('default');
  //Text
  //const [texts, setTexts] = useState([]); // initial array of texts and coordinates
 
  
  // zoom
  const [scale, setScale] = useState(1); // initial scale

  useEffect(() => {
    // set the transform-origin to the center of the svg
    const svg = svgRef.current;
    const bbox = svg.getBBox();
    const cx = bbox.x + bbox.width / 2;
    const cy = bbox.y + bbox.height / 2;
    //svg.style.transformOrigin = `${cx}px ${cy}px`;
	svg.style.transformOrigin = `0px 0px`;
  }, []);
  
  
   function zoomIn() {
    // increase the scale by 10%
    setScale(scale => scale * 1.1);
  }

  function zoomOut() {
    // decrease the scale by 10%
    setScale(scale => scale * 0.9);
  }
  // end zoom


  //drawing
  // handle mouse down event
  const handleMouseDown = (e) => {
     // start drawing
    e.preventDefault();
	//alert(controlType);
    if (svgRef.current && controlType === Operations.Draw) {
      // get the bounding box of the svg element
	  setDrawing(true);
      let bbox = svgRef.current.getBoundingClientRect();
      // calculate the offset for the x and y coordinates
	  //alert("scale " + scale + bbox + " x " + bbox.x + " y " +bbox.x);
      setOffsetX(bbox.x);
      setOffsetY(bbox.y);
    } else if (svgRef.current && controlType === Operations.Write) {
		const svg = svgRef.current;
		const point = svg.createSVGPoint();
		point.x = e.clientX;
		point.y = e.clientY;
		const {x, y} = point.matrixTransform(svg.getScreenCTM().inverse());
		// prompt the user for some text
		const value = prompt("Enter some text");
		const id = calculateElementId(enrichment.texts);
		// update the texts state with the new text object and coordinates
		//const updated = updateTexts(enrichment, [...enrichment.texts, {value, x, y, id }]);
		setEnrichment(orig => updateTexts(orig, [...orig.texts, {value, x, y, id }]));
	} else if (svgRef.current && controlType === Operations.ZoomIn) {
		zoomIn();
	} else if (svgRef.current &&controlType === Operations.ZoomOut) {
		zoomOut();
	}
  };
  
  const calculateElementId = (elements)  => {
	  if(elements.length === 0) {
		  return 1;
	  }
	  let max = elements.flat().reduce((max, obj) => {
		return max.id < obj.id ? obj : max;
	  });
	  return max.id + 1;
  }

  // handle mouse move event
  const handleMouseMove = (e) => {
    if (drawing) {
      // if drawing, add more points to the array with the offset subtracted
	  const updated = updatePoints(enrichment,
			[...enrichment.points, [(1/scale)*(e.clientX - offsetX), (1/scale)*( e.clientY - offsetY)],]);
      setEnrichment(updated);
    }
  };

  // handle mouse up event
  const handleMouseUp = () => {
    setDrawing(false); // stop drawing
    if (enrichment.points.length > 1) {
      // if there are more than one point in the current path, add it to the paths array
	  let path = {points: enrichment.points, id:calculateElementId(enrichment.paths)};
	  setEnrichment((orig) => updatePaths(enrichment, [...enrichment.paths, path]));
    }
	// reset the points array for the next path
    setEnrichment((orig) => updatePoints(orig, [])); 
  };
  
  const handleClick = (e) => {
    var target = e.target;
	// Check if the target element is a path element
	if( !(controlType === Operations.Delete)) {
		return;
	}
	if (target.tagName === "path") {
	// Prompt the user to confirm deleting the path
		const updated = enrichment.paths.filter( path => filterElements(path, target));
		setEnrichment((orig) => updatePaths(orig, updated));
	} else if (target.tagName === "text") {
		const updated = enrichment.texts.filter( text => filterElements(text, target));
		setEnrichment((orig) => updateTexts(orig, updated));
	}
  };
  
  const filterElements = (element, target) => {
	  return element.id != target.id;
  }
  
  const handleHoverEnter = (e) => {
    var target = e.target;
	if (target.tagName === "path") {
	    e.target.style.stroke = 'grey';  
	} else if (target.tagName === "text") {
		e.target.style.fill = 'grey';
	}
  };
  
  const handleHoverLeave = (e) => {
    var target = e.target;
	//alert(target.tagName);
	if (target.tagName === "path") {
	    e.target.style.stroke = 'red';  
	} else if (target.tagName === "text") {
		e.target.style.fill = 'black';
	}
  };

  // convert an array of points to a string for the d attribute of the path element
  const pointsToString = (points) => {
    return points.reduce(
      (acc, point, i) =>
        i === 0
          ? `M ${point[0]},${point[1]}` // if first point, use M command
          : `${acc} L ${point[0]},${point[1]}`, // else use L command
      ""
    );
  };
  //End of Drawing

  // save the svg as an svg file
  const saveSVG = () => {
    if (svgRef.current) {
      // get the svg element as a string
      let svgString = new XMLSerializer().serializeToString(svgRef.current);
      // create a blob from the svg string
      let blob = new Blob([svgString], { type: "image/svg+xml" });
      // use file-saver library to save the blob
      saveAs(blob, "drawing.svg");
    }
  };

  // save the svg as a png file
  const savePNG = () => {
    if (svgRef.current) {
      // create a canvas element to draw the svg on
      let canvas = document.createElement("canvas");
	  let ctx = canvas.getContext("2d");
      // get the svg element as a string
      let svgString = new XMLSerializer().serializeToString(svgRef.current);
	  let bgImage = new Image();
	  bgImage.onload = function(){
		canvas.width = bgImage.width;
        canvas.height = bgImage.height;
		ctx.drawImage(bgImage,0,0); // Or at whatever offset you like
	  };
	  bgImage.src = schemaURL;
      // create an image element to load the svg string
      let svgImg = new Image();
      svgImg.onload = function () {
        // when the image is loaded, draw it on the canvas
   
        ctx.drawImage(svgImg, 0, 0);
        // get the canvas as a data url and create a blob from it
        let dataURL = canvas.toDataURL("image/png");
        let blob = dataURLToBlob(dataURL);
        // use file-saver library to save the blob
        saveAs(blob, "drawing.png");
      };
      svgImg.src = "data:image/svg+xml;base64," + btoa(svgString); // set the image source to the base64 encoded svg string
    }
  };
  
  

  // helper function to convert data url to blob
  const dataURLToBlob = (dataURL) => {
    let parts = dataURL.split(";base64,");
    let contentType = parts[0].split(":")[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;
    let uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  };
  
  const handlePickOperation = (operationType) => {
	setControlType(operationType);
    setCursorStyle(Cursors.get(operationType));
  };

  return (
    <div className="drawing-board">
      <h1>Drawing Board</h1>
	  <div className="controls" style={{position: "relative", zIndex: 1}}>
		  <Button onClick={zoomIn}>Zoom in</Button>
		  <Button onClick={zoomOut}>Zoom out</Button>
		  <Button onClick={saveSVG}>Save as SVG</Button>
          <Button onClick={savePNG}>Save as PNG</Button>
		  <div>
		     <span className="p-buttonset">
				  <Button icon="pi pi-pencil" onClick={() => handlePickOperation(Operations.Draw)}/>
				  <Button icon="pi pi-eraser" onClick={() => handlePickOperation(Operations.Delete)}/>
				  <Button icon="pi pi-file-edit" onClick={() => handlePickOperation(Operations.Write)}/>
				  <Button icon="pi pi-search-plus" onClick={() => handlePickOperation(Operations.ZoomIn)}/>
				  <Button icon="pi pi-search-minus" onClick={() => handlePickOperation(Operations.ZoomOut)}/>
			  </span>
			</div>
	  </div>
		<div className="board" style={{width: "800px", height: "800px", zIndex: 0, cursor: cursorStyle}}>
		  <svg
			ref={svgRef}
			width="800px"
			height="800px"
			style={{ border: "1px solid black",transform: `scale(${scale})` }}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onClick={handleClick}
			onMouseOver={handleHoverEnter}
            onMouseOut={handleHoverLeave}
		  >
		  <image href={schemaURL}  width="100%" height="100%"/>
			{enrichment.paths.map((path) => (
			  <path
			    id={path.id}
				key={path.points.toString()}
				d={pointsToString(path.points)}
				fill="none"
				stroke="red"
				strokeWidth={brushWidth * (1/scale)}
			  />
			))}
			{enrichment.points.length > 0 && (
			  <path
				d={pointsToString(enrichment.points)}
				fill="none"
				stroke="black"
				strokeWidth={brushWidth * (1/scale)}
				strokeDasharray="5,5"
			  />
			)}
			{enrichment.texts.map((text, i) => (
            <text key={i} x={text.x} y={text.y} id={text.id} style={{fill: "black"}}>{text.value}</text>
          ))}
		  </svg>
	  </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <DrawingBoard imageUrl="/gallery/img1.png" brushWidth="8"/>
    </div>
  );
}

export default App;
