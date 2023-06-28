export const handleSubmit = (data, auth, setRequest) => {
      //e.preventDefault();
	  var toSend = JSON.parse(JSON.stringify(data));
	  if(toSend.previews) {
		  for( var preview of toSend.previews) {
			  delete preview.file;
		  }
	  }
      fetch('http://localhost:8080/reviews', {
         method: 'POST',
         body: JSON.stringify(toSend),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
			'Authorization': 'Bearer ' + auth.token,
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Origin':'*',
         },
      })
         .then((res) => res.json())
         .then((post) => {
			var newState = post;
			if(newState.previews) {
				const updatedPreviews = newState.previews.map(preview => {
				  var file = findFile(data.previews, preview.fileId)
				  return {...preview, file:file };
				});
				newState = {...newState,previews:updatedPreviews};
			}
			 setRequest(newState);
			 console.log(post);
			 /*
            setPosts((posts) => [post, ...posts]);
            setTitle('');
            setBody('');
			*/
         })
         .catch((err) => {
            console.log(err.message);
         });
   };
   
   function findFile(localFiles, fileId) {
	   const file = localFiles.find( element => element.fileId === fileId).file;
	   return file;
   }
   
   
  export async function loadReviews(data, auth) {
      //e.preventDefault();
      const response = await fetch('http://localhost:8080/reviews', {
         method: 'GET',
         headers: {
			'Authorization': 'Bearer ' + auth.token,
			'Access-Control-Allow-Methods': 'GET, OPTIONS',
			'Access-Control-Allow-Origin':'*',
         },
      });
	  
	  if (response.status == 401) {
		  auth.logout();
		  return;
	  }
      const result = await response.json();
	  return result;
   };
   
    export async function loadReview(id, auth, setReviewRequest) {
      //e.preventDefault();
      const response = await fetch('http://localhost:8080/reviews/' + encodeURIComponent(id), {
         method: 'GET',
         headers: {
			'Authorization': 'Bearer ' + auth.token,
			'Access-Control-Allow-Methods': 'GET, OPTIONS',
			'Access-Control-Allow-Origin':'*',
         },
      });
	  
	  if (response.status == 401) {
		  auth.logout();
		  return;
	  }
      const result = await response.json();
	  var review = result;
	  var previewPromises = review.previews.map(preview  => loadImageForPreview(preview, auth));
	  Promise.all(previewPromises).then((values) => {
		review ={...review, previews:values};
	    setReviewRequest(review);
	  });
   };
   
   export async function loadImageForPreview(preview, auth ) {
      //e.preventDefault();
      const response = await fetch('http://localhost:8080/files/' + encodeURIComponent(preview.fileId), {
         method: 'GET',
         headers: {
			'Authorization': 'Bearer ' + auth.token,
			'Access-Control-Allow-Methods': 'GET, OPTIONS',
			'Access-Control-Allow-Origin':'*',
         },
      });
	  
	  if (response.status == 401) {
		  auth.logout();
		  return;
	  }
      const blob = await response.blob();
	  const result = URL.createObjectURL(blob);
	  return {...preview, file:{preview:result}};;
   };

   
export async function uploadFiles(files, auth) {
  const formData = new FormData();
  for (const file of files) {
    formData.append('files', file);
  }
  const response = await fetch('http://localhost:8080/files', {
    method: 'POST',
    body: formData,
	headers: {
			'Authorization': 'Bearer ' + auth.token,
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Origin':'*',
         },
  });
  if (response.status == 401) {
	  auth.logout();
	  return;
  }
  const result = await response.json();
  return result;
}

export async function uploadFile(file, auth) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:8080/file', {
    method: 'POST',
    body: formData,
	headers: {
			'Authorization': 'Bearer ' + auth.token,
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Origin':'*',
         },
  });
  if (response.status == 401) {
	  auth.logout();
	  return;
  }
  const result = await response.text();
  return result;
}