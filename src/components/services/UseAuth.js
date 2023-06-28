import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const context = useCookie();
  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

function useCookie() {
  const [token, setToken] = useState(() => {
    try {
      const value = Cookies.get("API_TOKEN");
	  
      if (value) {
        return value;
      } else {
        return null;
      }
    } catch (err) {
      return null;
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