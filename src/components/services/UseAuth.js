import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";


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
  
  const isGuest = () => {
	const value = Cookies.get("API_TOKEN");
	const claims = jwt_decode(value);
	return "Guest" === claims.role;
  }
  
  const guestReviewId = () => {
	const value = Cookies.get("API_TOKEN");
	const claims = jwt_decode(value);
	return claims.reviewId;
  }
  
  const logout = () => {
    try {
      Cookies.remove("API_TOKEN");
	  setToken(null);
    } catch (err) {
      console.log(err);
	}
  };

  return {token, logout, login, isGuest, guestReviewId};
};


export const useAuth = () => {
  return useContext(AuthContext);
};