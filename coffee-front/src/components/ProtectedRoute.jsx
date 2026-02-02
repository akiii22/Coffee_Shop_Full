import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("authToken");
  if (!isAuthenticated) {
    toast.error("You need to create account or login");
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
