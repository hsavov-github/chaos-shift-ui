import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from 'primereact/button';
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { useNavigate } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';

function ReviewBoard() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleThumbnailClick = (e) => {
	//history.push('/second-page', { inputValue }});
	 navigate('/chaos-shift-ui/drawing');
  };

  const previews = files.map(file => (
    <div key={file.name}>
      <div  style={{ display: 'flex', flexDirection: 'row'}}>
        <img
          src={file.preview}
          alt={file.name}
          style={{ width: '100px', height: '100px' }}
        />
		<div className="actions" style={{ display: 'flex', flexDirection: 'column', padding:'2px'}}>
			<Button icon="pi pi-file-edit" onClick = {handleThumbnailClick}/>
			<Button icon="pi pi-trash"/>
		</div>
		<div className="properties" style={{ display: 'flex', flexDirection: 'column', padding:'2px'}}>
			<InputText value="Title" onChange={(e) => {}} />
			<InputTextarea value="Description" onChange={(e) => {}} rows={5} cols={30} />
		</div>
      </div>
    </div>
  ));

  return (
    <div style = {{ marginLeft: '200px'}}>
	 <div {...getRootProps()}>
        <input {...getInputProps()} />
				<p>Drag and drop your images here, or click to select files</p>
			<div style = {{ alignment: 'center'}}>
				<img src="drag-drop.svg" width="20%" height="20%" />
			</div>
      </div>
      <aside>
	   <div className="previews" style={{ display: 'flex', flexDirection: 'column' }}>
        {previews}
		</div>
      </aside>
	 
    </div>
  );
}

export default ReviewBoard;
