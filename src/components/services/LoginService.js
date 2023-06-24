import Cookies from 'js-cookie';

export const login = (username, password, redirect) => {
	
	  const formData  = new FormData();
	  formData.append('username', username);
	  formData.append('password', password);
      //e.preventDefault();
      fetch('http://localhost:8080/auth/login', {
         method: 'POST',
         body: formData
      })
         .then((res) => res.text())
         .then((post) => {
			 console.log(post);
			 const secure = window.location.protocol === 'https';
			 Cookies.set("API_TOKEN", post, undefined, "/", undefined, secure);
			 console.log("stored cookie" + Cookies.get("API_TOKEN"));
			 redirect();
			 
			 //cookies.removeItem('API_TOKEN');
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
   
   export const Logout = (redirect) => {
	Cookies.remove("API_TOKEN");
	redirect();
	console.log("stored cookie" + Cookies.get("API_TOKEN"));
	
   };