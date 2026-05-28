import { Navigate } from "react-router-dom";
import { useLogin } from "../../Context/LoginContext";

export default function AdminRoute({ children }) {
  const { token, role } = useLogin();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (role !== "admin") {
    return <Navigate to="/customer-dashboard" />;
  }
  return children;
}
