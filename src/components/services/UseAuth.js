import { createContext, useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const context = useCookie();//
  /*
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    setToken(data);
    navigate("/profile");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setToken(null);
    navigate("/chaos-shift-ui/login", { replace: true });
  };*/
  

  //const value = useCookie();
  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

function useCookie() {
  const [token, setToken] = useState(() => {
    try {
      const value = Cookies.get("API_TOKEN");

      if (value) {
		setToken(value);
        return {token:value};// JSON.parse(value);
      } else {
		const secure = window.location.protocol === 'https';
        Cookies.set("API_TOKEN", null, undefined, "/", undefined, secure);
        return {token:null};
      }
    } catch (err) {
      return {token:null};
    }
  });
  
  const login = () => {
	const value = Cookies.get("API_TOKEN");
	setToken(value);
  }
  
  const logout = () => {
    try {
      Cookies.remove("API_TOKEN");
	  setToken(null);
    } catch (err) {
      console.log(err);
	}
  };

  return {token, logout, login};
};


export const useAuth = () => {
  return useContext(AuthContext);
};