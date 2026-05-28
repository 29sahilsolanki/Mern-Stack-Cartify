import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLogin } from "./LoginContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const navigate = useNavigate();

  const { token, role } = useLogin();

  //------------menu--------------//
  const [menu, setMenu] = useState(false);

  //--------------uploading products----------------//
  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [image, setImage] = useState(null);

  const uploadProduct = async (formData) => {
    const url = "https://cartify-vq4o.onrender.com/cartify/add-products";
    try {
      const res = await axios.post(url, formData);
      console.log(res?.data);
      setData({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "",
      });
      setImage(null);
      toast.success(res?.data?.message);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.log(error?.response?.data);
      toast.error(error?.response?.data?.message);
      setData({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "",
      });
      setImage(null);
    }
  };

  //-----------------fetch all products------------------//
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const url = "https://cartify-vq4o.onrender.com/cartify/all-products";
      const res = await axios.get(url, { headers: { Authorization: token } });
      setProducts(res?.data?.fetchRes);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
  useEffect(() => {
    if (token && role === "admin") {
      fetchProducts();
    }
  }, [token, role]);

  //--------------fetch all customers--------------//
  const [customers, setCustomers] = useState([]);
  const fetchCustomers = async () => {
    try {
      const url = "https://cartify-vq4o.onrender.com/cartify/all-customers";
      const res = await axios.get(url, { headers: { Authorization: token } });
      setCustomers(res?.data?.customers.filter((p) => p.role !== "admin"));
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (token && role === "admin") {
      fetchCustomers();
    }
  }, [token, role]);

  // customer deatils
  const [customerDetails, setCustomerDetails] = useState(null);
  const fetchCustomerOrders = async (customer, id) => {
    const url = "https://cartify-vq4o.onrender.com/cartify/fetch-order";
    try {
      const res = await axios.get(url, {
        params: { id },
        headers: { Authorization: token },
      });
      setCustomerDetails({ ...customer, order: res?.data?.orderRes });
    } catch (error) {
      toast.info(error?.response?.data?.message);
      setCustomerDetails(customer);
      console.log(error?.response?.data);
    }
  };
  //---------------------fetch orders----------------------//
  const [orders, setOrders] = useState([]);
  const fetchAllOrder = async () => {
    const url = "https://cartify-vq4o.onrender.com/cartify/all-orders";
    try {
      const res = await axios.get(url, { headers: { Authorization: token } });
      setOrders(res?.data?.orderRes);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    if (token && role === "admin") {
      fetchAllOrder();
    }
  }, [token, role]);

  const [date, setDate] = useState("");
  const fetchOrderByDate = async (orderId) => {
    const url = "https://cartify-vq4o.onrender.com/cartify/fetch-order-date";
    try {
      const res = await axios.get(url, {
        params: { date, orderId },
        headers: { Authorization: token },
      });
      setOrders(res?.data?.fetchRes);
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      fetchAllOrder();
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    if (date) {
      fetchOrderByDate();
    }
  }, [date]);

  const updateOrderStatus = async (orderId, status) => {
    const url = "https://cartify-vq4o.onrender.com/cartify/update-status";
    try {
      const confirmChange = window.confirm(
        `Do you want to change status of Order ${orderId} to "${status}"?`,
      );
      if (!confirmChange) {
        return toast.info("Order status didn't change..!!");
      }
      const res = await axios.put(
        url,
        { orderId, status },
        { headers: { Authorization: token } },
      );
      toast.success(res?.data?.message);
      fetchAllOrder();
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  //fetch admin details
  const [admin, setAdmin] = useState("");
  const fetchAdminDetails = async () => {
    const url = "https://cartify-vq4o.onrender.com/cartify/admin";
    try {
      const res = await axios.get(url, { headers: { Authorization: token } });
      setAdmin(res?.data?.adminRes);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    if (token && role === "admin") {
      fetchAdminDetails();
    }
  }, [token, role]);

  //--------------------update admin info---------------------//
  //profile pic
  const [profilePic, setProfilePic] = useState(null);
  const updateAdminProfile = async () => {
    const formData = new FormData();
    formData.append("profile", profilePic);

    const url = "https://cartify-vq4o.onrender.com/cartify/update-admin-profile";
    try {
      const res = await axios.put(url, formData, {
        headers: { Authorization: token },
      });
      toast.success(res?.data?.message);
      fetchAdminDetails();
      setProfilePic(null);
      console.log(res?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  //profile details
  const [adminDetails, setAdminDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (admin) {
      setAdminDetails({
        name: admin.name || "",
        email: admin.email || "",
        phone: admin.phone || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [admin]);
  const updateAdminInfo = async () => {
    const url = "https://cartify-vq4o.onrender.com/cartify/update-admin-details";
    try {
      const res = await axios.put(url, adminDetails, {
        headers: { Authorization: token },
      });
      console.log(res?.data);
      setAdminDetails({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPass: "",
      });
      toast.success(res?.data?.message);
      fetchAdminDetails();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  //-----------------------update product details-------------------------//
  //find product details to show previous data
  const [existingDetails, setExistingDetails] = useState({});
  const [itemId, setItemId] = useState("");
  useEffect(() => {
    if (itemId) {
      setExistingDetails(products.find((p) => p._id === itemId));
    }
  }, [itemId]);

  const updateProductDetails = async (formData) => {
    const url = "https://cartify-vq4o.onrender.com/cartify/update-product-details";
    try {
      const res = await axios.put(url, formData, {
        headers: { Authorization: token },
      });
      toast.success(res?.data?.message);
      fetchProducts();
      setItemId("");
      setTimeout(() => {
        navigate(-1);
      });
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  //----------------------support ticket-----------------------//
  const [ticketInfo, setTicketInfo] = useState([]);
  const [ticketDate, setTicketDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const localDate = new Date(
      today.getTime() - today.getTimezoneOffset() * 60000,
    )
      .toISOString()
      .split("T")[0];
    setTicketDate(localDate);
  }, []);

  const fetchTicketDate = async () => {
    const url = "https://cartify-vq4o.onrender.com/cartify/support-admin";
    try {
      const res = await axios.get(`${url}/${ticketDate}`, {
        headers: { Authorization: token },
      });
      setTicketInfo(res?.data?.ticketRes);
      toast.success(res?.data?.message);
    } catch (error) {
      setTicketInfo([]);
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    if (token && role === "admin" && ticketDate) {
      fetchTicketDate();
    }
  }, [ticketDate]);

  const adminTicketReply = async (supportId, userId, adminReply) => {
    const url = "https://cartify-vq4o.onrender.com/cartify/admin-ticket-reply";
    try {
      const res = await axios.put(
        url,
        { supportId, adminReply },
        {
          headers: { Authorization: token },
        },
      );
      toast.success(res?.data?.message);
      fetchTicketDate();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  //--------------------------delete user and details----------------------------//
  const deleteUserAndDetails = async (id) => {
    const url = `https://cartify-vq4o.onrender.com/cartify/delete-user/${id}`;
    try {
      const res = await axios.delete(url, {
        headers: { Authorization: token },
      });
      console.log(res?.data);
      navigate("/admin-dashboard/customers");
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        data,
        image,
        menu,
        products,
        customers,
        orders,
        admin,
        profilePic,
        adminDetails,
        existingDetails,
        customerDetails,
        date,
        ticketDate,
        ticketInfo,
        setTicketDate,
        setDate,
        setCustomerDetails,
        setItemId,
        setAdminDetails,
        setProfilePic,
        setMenu,
        setImage,
        setData,
        uploadProduct,
        fetchProducts,
        fetchCustomers,
        updateOrderStatus,
        updateAdminProfile,
        updateAdminInfo,
        updateProductDetails,
        fetchCustomerOrders,
        fetchOrderByDate,
        fetchAllOrder,
        adminTicketReply,
        deleteUserAndDetails,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

//---------------fetch customers---------------//

export const useAdmin = () => useContext(AdminContext);
