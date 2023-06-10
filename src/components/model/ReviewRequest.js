export class ReviewRequest {

  constructor(title, description, status) {
    this.title = title;
    this.description = description;
	this.status = status;
	//this.previews = previews;
  }
  
  withTitle( newTitle) {
	  return { ...this, title: newTitle}
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
