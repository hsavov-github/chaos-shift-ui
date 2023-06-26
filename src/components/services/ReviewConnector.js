export const handleSubmit = (data, auth) => {
      //e.preventDefault();
      fetch('http://localhost:8080/reviews', {
         method: 'POST',
         body: JSON.stringify(data),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
			'Authorization': 'Bearer ' + auth.token,
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Origin':'*',
         },
      })
         .then((res) => res.json())
         .then((post) => {
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
   
    export async function loadReview(id, auth) {
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
	  return result;
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
  console.log(result);
}