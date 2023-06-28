import { Navigate } from "react-router-dom";
import { useAuth } from "./services/UseAuth";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    // user is not authenticated
    return <Navigate to="/chaos-shift-ui/login" />;
  }
  return children;
};

export default ProtectedRoute;