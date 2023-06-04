import {INITIAL_VALUE, ReactSVGPanZoom, TOOL_NONE, fitSelection, zoomOnViewerCenter, fitToViewer} from 'react-svg-pan-zoom';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import Draggable from 'react-draggable';
import Operations from'./OperationsState';
import MenuBar from'./MenuBar';
import ImageUploader from'./ImageUploader';
import { saveSVG, savePNG } from './FileExport';

const Cursors = new Map([
  [Operations.Draw, 'crosshair'],
  [Operations.Write, 'text'],
  [Operations.Delete, 'not-allowed'],
  [Operations.ZoomIn, 'zoom-in'],
  [Operations.ZoomOut, 'zoom-out'],
]);

function DrawingBoard({ brushWidth }) {
  const svgRef = useRef(null); // reference to the svg element
  const [image, setImage] = useState(null);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
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
  

 
 
  //touchscreen draw - hacky but allows passing passive:false 
  useEffect(() => {
    const svgElement = svgRef.current;
    if (svgElement && controlType === Operations.Draw) {
      const handleTouchMove = (e) => {
        e.preventDefault();
		console.log("Handle touch");
		handleMouseDown(e.touches[0]);
		handleMouseMove(e.touches[0]);		
      };
      svgElement.addEventListener('touchmove', handleTouchMove, {passive: false});
	  
      return () => {
        svgElement.removeEventListener('touchmove', handleTouchMove);
      };
    }
  },[drawing, enrichment, scale]);
  
  useEffect(() => {
    const svgElement = svgRef.current;
    if (svgElement) {
      const handleTouchStart = (e) => {
        e.preventDefault();
		console.log("Handle touch start");
		handleMouseDown(e);
      };
      svgElement.addEventListener('touchstart', handleTouchStart, {passive: false});
	  
      return () => {
        svgElement.removeEventListener('touchstart', handleTouchStart);
      };
    }
  },[controlType,]);
  


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
    console.log("Drawing");
	//alert(controlType);
	if(drawing) {
		return true;
	}
    if (svgRef.current && controlType === Operations.Draw) {
      // get the bounding box of the svg element
	  e.preventDefault();
	  setDrawing(true);
	  //console.log("Drawing");
      let bbox = svgRef.current.getBoundingClientRect();
      // calculate the offset for the x and y coordinates
	  //alert("scale " + scale + bbox + " x " + bbox.x + " y " +bbox.x);
      setOffsetX(bbox.x);
      setOffsetY(bbox.y);
    } else if (svgRef.current && controlType === Operations.Write) {
		
		initiateTyping(e);
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
		console.log("mousemove");
      // if drawing, add more points to the array with the offset subtracted
	  const updated = updatePoints(enrichment,
			[...enrichment.points, [(1/scale)*(e.clientX - offsetX), (1/scale)*( e.clientY - offsetY)],]);
      setEnrichment(updated);	  
    }
  };

  // handle mouse up event
  const handleMouseUp = (e) => {
	  console.log("handleMouseUp");
	if(controlType !== Operations.Draw || !drawing) {
		//redirect for touch events
		console.log("Redirect to click move");
		handleClick(e);
		return;
	}
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
		console.log("Deleting path" );
		const updated = enrichment.paths.filter( path => filterElements(path, target));
		setEnrichment((orig) => updatePaths(orig, updated));
	} else if (target.tagName === "text") {
		console.log("Deleting text" );
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
  //change image
   const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
		
		const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          setImgSize({ width: img.width, height: img.height });
        };
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  
  const handlePickOperation = (operationType) => {
	setControlType(operationType);
    setCursorStyle(Cursors.get(operationType));
  };

  return (
  <div className = "drawing-board">
  <ImageUploader sharedImage={image} onImageChange={handleFileChange} />
    <div className="main-panel" style={{ display: 'flex', flexDirection: 'row' }}>
	
	    <MenuBar zoomIn={zoomIn} zoomOut = {zoomIn} saveSVG = {() => saveSVG(svgRef)} savePNG = {() => savePNG(svgRef, image)} handlePickOperation = {handlePickOperation} />
		<div id="boundary" className="board" style={{zIndex: 0, cursor: cursorStyle}}>
		  <svg
			ref={svgRef}
			width={imgSize.width}
			height={imgSize.height}
			style={{transform: `scale(${scale})` }}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
			onClick={handleClick}
			onMouseOver={handleHoverEnter}
            onMouseOut={handleHoverLeave}
		  >
		  <image href={image}  width="100%" height="100%"/>
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
	</div>
  );
}
export default DrawingBoard;
