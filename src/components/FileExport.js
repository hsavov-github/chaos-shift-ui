import { saveAs } from "file-saver";

  export function saveSVG(svgRef) {
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
  export function savePNG(svgRef, image) {
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
	  bgImage.src = image;
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