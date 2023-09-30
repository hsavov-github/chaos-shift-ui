import {SERVER_URI} from '../../services/const';

export async function loadImage(fileId, auth ) {
      //e.preventDefault();
      const response = await fetch('http://' + SERVER_URI + ':8080/files/' + encodeURIComponent(fileId), {
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
	  var file = {blob:blob, preview:result};
	  return file;
   };
export const handleSubmit = (data, auth, setRequest) => {
      //e.preventDefault();
	  var toSend = JSON.parse(JSON.stringify(data));
	  if(toSend.previews) {
		  for( var preview of toSend.previews) {
			  delete preview.file;
			  delete preview.points;
		  }
	  }
      const response = fetch('http://' + SERVER_URI + ':8080/reviews', {
         method: 'POST',
         body: JSON.stringify(toSend),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
			'Authorization': 'Bearer ' + auth.token,
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Origin':'*',
         },
      })
         .then((res) => {
			 if (res.status == 401) {
				auth.logout();
				throw new Error('Unauthenticated!');;
			}
			return res.json()
		 })
         .catch((err) => {
            console.log(err.message);
         });
		 return response
   };