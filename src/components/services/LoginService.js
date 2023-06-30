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
   
   export const authGuest = (token, auth, navigate) => {
     const formData  = new FormData();
	  formData.append('sessionToken', token);
      fetch('http://localhost:8080/auth/session', {
         method: 'POST',
         body: formData
      })
         .then((res) => res.json())
         .then((post) => {
			 console.log(post);
			 const secure = window.location.protocol === 'https';
			 Cookies.set("API_TOKEN", post.token, undefined, "/", undefined, secure);
			 Cookies.set("REVIEW_ID", post.reviewId, undefined, "/", undefined, secure);
			 console.log("stored cookie" + Cookies.get("API_TOKEN"));
			 auth.login();
			 navigate("/chaos-shift-ui/request?reviewReqId=" + post.reviewId, { replace: true });
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