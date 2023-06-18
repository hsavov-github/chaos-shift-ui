export class ReviewRequest {

  constructor(title, description, status) {
    this.title = title;
    this.description = description;
	this.status = status;
	//this.previews = previews;
  }
  
  withTitle(newTitle) {
	  return { ...this, title: newTitle}
  }
  
  withDescription(newDescription) {
	  return {...this, description: newDescription}
  }
  
  withStatus(newStatus) {
	  return {...this, status: newStatus}
  }
  
  withPreviews(newPreviews) {
	  return {...this, previews: newPreviews}
  }
  
  withNewPreview(newPreview) {
	  if(this.previews) {
		  const newPreviews = [...this.previews, newPreview];
		  return this.withPreviews(newPreviews);
	  } else {
		  return {...this, previews: [newPreview]}
	  }
  }
  
}

export function getDummyRequests () {
	const dummyRequest = new ReviewRequest('Shanghai Tower ', 'Dummy Description', 'active' );
	const elements = [dummyRequest, 
		dummyRequest.withTitle('Ocean Tower Shanghai'),
		dummyRequest.withTitle('The Bund Shanghai Master Plan'),
		dummyRequest.withTitle('Pudong Villa Passive House'),
		dummyRequest.withTitle('Sofia Airport'),
		dummyRequest.withTitle('National Art Gallery Renovation Sofia'),
		dummyRequest.withTitle('Burj Khalifa Dubai')
		]
		
	return elements;
	
}


export function getDummyRequestByTitle ( title) {
	
	const elements = getDummyRequests().filter(request => {
			  return request.title === title;
		  })
		
	return elements[0];
	
}
