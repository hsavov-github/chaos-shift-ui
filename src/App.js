import logo from './logo.svg';
import './App.css';
import {INITIAL_VALUE, ReactSVGPanZoom, TOOL_NONE, fitSelection, zoomOnViewerCenter, fitToViewer} from 'react-svg-pan-zoom';
import React, { useState, useEffect, useRef } from 'react';
import { saveAs } from "file-saver";
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import Draggable from 'react-draggable';
import ImageUploader from'./components/ImageUploader';


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

function DrawingBoard({ imageURL, brushWidth }) {
  const svgRef = useRef(null); // reference to the svg element
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
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editPosition, setEditPosition] = useState({ x: 0, y: 0 });
  const inputRef = useRef();
 
  
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
    
	//alert(controlType);
    if (svgRef.current && controlType === Operations.Draw) {
      // get the bounding box of the svg element
	  e.preventDefault();
	  setDrawing(true);
      let bbox = svgRef.current.getBoundingClientRect();
      // calculate the offset for the x and y coordinates
	  //alert("scale " + scale + bbox + " x " + bbox.x + " y " +bbox.x);
      setOffsetX(bbox.x);
      setOffsetY(bbox.y);
    } else if (svgRef.current && controlType === Operations.Write) {
		
		initiateTyping(e);
		/*
		
		const svg = svgRef.current;
		
		const svgRect = event.currentTarget.getBoundingClientRect();
		const x = event.clientX - svgRect.left;
		const y = event.clientY - svgRect.top;

		setTexts((prevTexts) => [...prevTexts, { x, y, text }]);
		setText('');
		//const point = svg.createSVGPoint();
		point.x = e.clientX;
		point.y = e.clientY;
		const {x, y} = point.matrixTransform(svg.getScreenCTM().inverse());
		// prompt the user for some text
		const value = prompt("Enter some text");
		const id = calculateElementId(enrichment.texts);
		// update the texts state with the new text object and coordinates
		//const updated = updateTexts(enrichment, [...enrichment.texts, {value, x, y, id }]);
		setEnrichment(orig => updateTexts(orig, [...orig.texts, {value, x, y, id }]));
		*/
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
  
  const handleTouchMove = (e) => {
    e.preventDefault();
    handleMouseMove(e.touches[0]);
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
		const updated = enrichment.paths.filter( path => filterElements(path, target));
		setEnrichment((orig) => updatePaths(orig, updated));
	} else if (target.tagName === "text") {
		const updated = enrichment.texts.filter( text => filterElements(text, target));
		setEnrichment((orig) => updateTexts(orig, updated));
	}
  };
  
  const filterElements = (element, target) => {
	  return element.id !== target.id;
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
  
  //text
  const initiateTyping = (event) => {
    if (!isEditing && event.target.tagName !== 'text') {
      const svgRect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - svgRect.left - 50;
	  const y = event.clientY - svgRect.top - 25;

      setEditPosition({ x, y });
      setIsEditing(true);
    }
  };
  
  const handleInputBlur = (event) => {
    const value = event.target.textContent;
    if (value) {
      setIsEditing(false);
	  const id = calculateElementId(enrichment.texts);
	  
	  const x = editPosition.x;
      const y = editPosition.y + 25;
	  setEnrichment(orig => updateTexts(orig, [...orig.texts, {value, x, y, id }]));
	  setText('');
    }
   };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.blur();
    }
  };
  

  const handleDrop = (event) => {
    event.preventDefault();
	
	const draggedTextIndex = event.target.id;
    if (draggedTextIndex !== null) {
      //const svgRect = event.currentTarget.getBoundingClientRect();
      //const x = event.target.attributes.x;//event.clientX - offsetX;// - svgRect.left;
      //const y = event.target.attributes.y;// - svgRect.top;
	  
	  if(! (event.target.attributes.x || event.target.attributes.y )) {
		  return;
	  }
	  
	  var transformOffsetX = 0, transformOffsetY =0;
	   // An SVGTransformList
      if( event.target.transform && event.target.transform.baseVal > 0 ) {
		var xforms = event.target.transform.baseVal;
		var firstXForm = xforms.getItem(0);       // An SVGTransform
		//if (firstXForm.type == SVGTransform.SVG_TRANSFORM_TRANSLATE){
		transformOffsetX = firstXForm.matrix.e;
	    transformOffsetY = firstXForm.matrix.f;
		//    }
		event.target.transform.baseVal.getItem(0).setTranslate(0,0);
	  }
	 const x = transformOffsetX + Number(event.target.attributes.x.nodeValue);//event.clientX - offsetX;// - svgRect.left;
     const y = transformOffsetY + Number(event.target.attributes.y.nodeValue);// - svgRect.top;
	 
	  
	  const updatedTexts = enrichment.texts.map((text) =>
          text.id == draggedTextIndex ? { ...text, x:x, y:y } : text
        );
	  setEnrichment(orig => updateTexts(orig, updatedTexts));
    }
  };
  
  //end of text

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
	  bgImage.src = imageURL;
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
		<div id="boundary" className="board" width="800px"
			height="800px" style={{width: "800px", height: "800px", zIndex: 0, cursor: cursorStyle}}>
		  <svg
			ref={svgRef}
			width="800px"
			height="800px"
			style={{ border: "1px solid black",transform: `scale(${scale})` }}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onTouchStart={handleMouseDown}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
			onClick={handleClick}
			onMouseOver={handleHoverEnter}
            onMouseOut={handleHoverLeave}
		  >
		  <image href={imageURL}  width="100%" height="100%"/>
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
			<Draggable onStop={handleDrop} id={text.id} bounds="#boundary" >
				<text key={i} x={text.x} y={text.y} id={text.id} style={{fill: "black", userSelect: 'none'}}>{text.value}</text>
			</Draggable>
          ))}
		  
			  {isEditing && (
			  <foreignObject x={editPosition.x} y={editPosition.y} width="100" height="50">
				<div
				  ref={inputRef}
				  contentEditable
				  suppressContentEditableWarning
				  onBlur={handleInputBlur}
				  onKeyDown={handleInputKeyDown}
				  style={{
					width: '100%',
					height: '100%',
					cursor: 'text'
				  }}
				>
				<p> Your message comes here {text} </p>
				</div>
			  </foreignObject>
			)}
		  </svg>
	  </div>
    </div>
  );
}

function App() {
 const [image, setImage] = useState(null);
 
 const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
 
  return (
    <div className="App">
	  <ImageUploader sharedImage={image} onImageChange={handleFileChange} />
      <DrawingBoard imageURL={image}  brushWidth="8"/>
    </div>
  );
}

export default App;
