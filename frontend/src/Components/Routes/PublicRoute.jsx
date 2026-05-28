import { Navigate } from "react-router-dom";
import { useLogin } from "../../Context/LoginContext";

export default function PublicRoute({ children }) {
  const { token, role } = useLogin();
  if (token) {
    if (role === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }
    if (role === "customer") {
      return <Navigate to="/customer-dashboard" replace />;
    }
  }
  return children;
}
