import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");

  const tokenVerify = async () => {
    try {
      const url = "https://cartify-vq4o.onrender.com/cartify/token-verify";
      const res = await axios.get(url, { headers: { Authorization: token } });
      console.log(res?.data);

      if (res.data.valid) {
        console.log(res?.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      setName("");
      setToken("");
      setRole("");
      setUserId("");

      localStorage.removeItem("Name");
      localStorage.removeItem("Token");
      localStorage.removeItem("UserId");
      localStorage.removeItem("Role");

      toast.error("Session expired, please login again..!!");
    }
  };

  useEffect(() => {
    if (token) {
      tokenVerify();
    }
  }, [token]);

  const [loading, setLoading] = useState(false);

  const userLogin = async (credentials) => {
    try {
      setLoading(true);
      const url = "https://cartify-vq4o.onrender.com/cartify/login";
      const loginData = credentials || loginInput;
      const res = await axios.post(url, loginData);
      console.log(res?.data);
      setLoginInput({ email: "", password: "" });
      toast.success(res?.data?.message);
      setName(res?.data?.name);
      setUserId(res?.data?.userId);
      setRole(res?.data?.role);
      setToken(res?.data?.jwtToken);

      localStorage.setItem("Name", res?.data?.name);
      localStorage.setItem("UserId", res?.data?.userId);
      localStorage.setItem("Role", res?.data?.role);
      localStorage.setItem("Token", res?.data?.jwtToken);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setName(localStorage.getItem("Name"));
    setUserId(localStorage.getItem("UserId"));
    setRole(localStorage.getItem("Role"));
    setToken(localStorage.getItem("Token"));
  }, []);

  //--------------------Logout----------------------//
  const userLogout = () => {
    setName("");
    setUserId("");
    setRole("");
    setToken("");
    toast.success("Logged out successfully");
    localStorage.removeItem("Name");
    localStorage.removeItem("UserId");
    localStorage.removeItem("Role");
    localStorage.removeItem("Token");
  };

  //--------------register customer----------------//
  const [image, setImage] = useState(null);
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPass: "",
  });

  const registerCustomer = async () => {
    const url = "https://cartify-vq4o.onrender.com/cartify/register";
    try {
      if (input.password !== input.confirmPass) {
        toast.error("Password and Confirm Password do not match");
        return;
      }

      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("phone", input.phone);
      formData.append("password", input.password);

      const res = await axios.post(url, formData);
      toast.success(res?.data?.message);
      setImage("");
      setInput({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPass: "",
      });
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        name,
        userId,
        role,
        token,
        loginInput,
        image,
        input,
        loading,
        setInput,
        setImage,
        setLoginInput,
        userLogin,
        userLogout,
        registerCustomer,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
