export class ProjectRequest {

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
