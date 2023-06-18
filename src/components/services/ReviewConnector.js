export const handleSubmit = (data) => {
      //e.preventDefault();
      fetch('http://localhost:8080/reviews', {
         method: 'POST',
         body: JSON.stringify(data),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
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
   
export async function uploadFiles(files) {
  const formData = new FormData();
  for (const file of files) {
    formData.append('files', file);
  }
  const response = await fetch('http://localhost:8080/files', {
    method: 'POST',
    body: formData
  });
  const result = await response.json();
  console.log(result);
}