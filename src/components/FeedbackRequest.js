import React, { useCallback, useState } from 'react';
import { Button } from 'primereact/button';
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Chips } from 'primereact/chips';
import { Panel } from 'primereact/panel';
import 'primereact/resources/themes/saga-blue/theme.css';
import ReviewBoard from './ReviewBoard';

function FeedbackRequest() {
  const [title, setTitle] = useState('');
  const [emails, setEmails] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="feedbackRequest">
	<Panel header="Collect feedback" toggleable>
		<div style={{ display: 'flex', flexDirection: 'row', padding:'4px', marginRight: '10px'}}>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} >
				<div style={{ marginBottom: '10px', maxWidth: '450px' }}>
					<InputText cols={20} placeholder="Title" value={title} onChange={(e) => {setTitle(e.target.value)}} />
				</div>
				<Chips style={{marginBottom: '10px', maxWidth: '450px'}} placeholder="Recipients" value={emails} onChange={(e) => {setEmails(e.value)}} separator="," />
				<div style={{ marginBottom: '10px' }}>
					<InputTextarea placeholder="Description" onChange={(e) => {}} rows={10} cols={70} />
				</div>
			</div>	
			<ReviewBoard />
		</div>	
	</Panel>
    </div>
  );
}

export default FeedbackRequest;
