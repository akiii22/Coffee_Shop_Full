import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("adminToken");

  if (!isAuthenticated) {
    toast.error("Access denied. Please log in.");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
