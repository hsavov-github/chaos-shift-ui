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
	const dummyRequest = new ReviewRequest('The Shanghai Redemption', 'Dummy Description', 'active' );
	const elements = [dummyRequest, 
		dummyRequest.withTitle('The Poohfather'),
		dummyRequest.withTitle('The Poohfather: Part II'),
		dummyRequest.withTitle('The Chineese Knight'),
		dummyRequest.withTitle('12 Angry Chineese Men'),
		dummyRequest.withTitle("Xin's List"),
		dummyRequest.withTitle('Yulechka Fiction')
		]
		
	return elements;
	
}


export function getDummyRequestByTitle ( title) {
	
	const elements = getDummyRequests().filter(request => {
			  return request.title === title;
		  })
		
	return elements[0];
	
}
