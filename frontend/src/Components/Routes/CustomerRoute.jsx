import { Navigate } from "react-router-dom";
import { useLogin } from "../../Context/LoginContext";

export default function CustomerRoute({ children }) {
  const { token, role } = useLogin();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (role === "admin") {
    return <Navigate to="/admin-dashboard" />;
  }

  return children;
}
