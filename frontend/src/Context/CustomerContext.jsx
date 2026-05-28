import axios from "axios";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useLogin } from "./LoginContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const { token, role } = useLogin();

  //---------------fetch products---------------//
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const url = "https://cartify-vq4o.onrender.com/cartify/all-products";
      const res = await axios.get(url);
      setProducts(res?.data?.fetchRes);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
  useEffect(() => {
    if (token && role === "customer") {
      fetchProducts();
    }
  }, [token, role]);

  //--------------single product details---------------//
  const [singleProduct, setSingleProduct] = useState("");

  const singleProductDetail = (product) => {
    setSingleProduct(product);
    if (token && role === "customer") {
      return navigate("/customer-dashboard/product-detail");
    } else {
      return navigate("/product-detail");
    }
  };

  //---------------------buy now---------------------//
  const [buyProduct, setBuyProduct] = useState(null);
  const manageBuyNow = (product) => {
    setBuyProduct({ ...product, quantity: 1 });
    if (token && role === "customer") {
      return navigate("/customer-dashboard/checkout");
    } else {
      toast.error("You must be logged in to place order..!!");
      return navigate("/login");
    }
  };

  //------------Reviews & Ratings-----------//

  const submitRating = async (rating, comment) => {
    const url = "https://cartify-vq4o.onrender.com/cartify/give-reviews";
    try {
      const productId = singleProduct._id;
      const res = await axios.post(
        url,
        { productId, rating, comment },
        { headers: { Authorization: token } },
      );
      toast.success(res?.data?.message);
      navigate("/customer-dashboard/shop");
      fetchProducts();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  //-------------delete review customer-------------//
  const deleteReview = async (reviewId) => {
    const url = "https://cartify-vq4o.onrender.com/cartify/delete-review";
    try {
      const res = await axios.delete(url, {
        params: { reviewId },
        headers: { Authorization: token },
      });
      toast.success(res?.data?.message);
      navigate("/customer-dashboard/shop");
      fetchProducts();
      console.log(res?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  //-----------------wishlist-------------------//

  const addToWishlist = async (productId) => {
    if (!token && role !== "customer") {
      toast.error("You must be logged in to modify wishlist..!!");
      return navigate("/login");
    }
    const url = "https://cartify-vq4o.onrender.com/cartify/add-wishlist";
    try {
      const res = await axios.post(
        url,
        { productId },
        { headers: { Authorization: token } },
      );
      toast.success(res?.data?.message);
      fetchWishlist();
      console.log(res?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  const [wishlist, setWishlist] = useState("");
  const fetchWishlist = async () => {
    const url = "https://cartify-vq4o.onrender.com/cartify/wishlist";
    try {
      const res = await axios.get(url, {
        headers: { Authorization: token },
      });
      setWishlist(res?.data?.wishlistItems);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    if (token && role === "customer") {
      fetchWishlist();
    }
  }, [token, role]);

  const removeFromWishlist = async (productId) => {
    try {
      const url = "https://cartify-vq4o.onrender.com/cartify/update-wishlist";
      const res = await axios.put(
        url,
        { productId },
        { headers: { Authorization: token } },
      );
      toast.success(res?.data?.message);
      console.log(res?.data);
      fetchWishlist();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  //-----------------cart-------------------//
  const addToCart = async (productId) => {
    if (!token && role !== "customer") {
      toast.error("You must be logged in to modify cart..!!");
      return navigate("/login");
    }
    try {
      const url = "https://cartify-vq4o.onrender.com/cartify/add-to-cart";
      const res = await axios.post(
        url,
        { productId },
        { headers: { Authorization: token } },
      );
      toast.success(res?.data?.message);
      fetchCartItems();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  const [cart, setCart] = useState([]);
  const fetchCartItems = async () => {
    const url = "https://cartify-vq4o.onrender.com/cartify/cart-items";
    try {
      const res = await axios.get(url, { headers: { Authorization: token } });
      setCart(res?.data?.cartItems?.items);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    if (token && role === "customer") {
      fetchCartItems();
    }
  }, [token, role]);

  const removeFromCart = async (productId) => {
    const url = "https://cartify-vq4o.onrender.com/cartify/remove-from-cart";
    try {
      const res = await axios.put(
        url,
        { productId },
        { headers: { Authorization: token } },
      );
      console.log(res?.data);
      toast.success(res?.data?.message);
      fetchCartItems();
    } catch (error) {
      toast.error(error?.reponse?.data?.message);
      console.log(error?.response?.data);
    }
  };

  const manageCartQuantity = async (productId, change) => {
    const url = "https://cartify-vq4o.onrender.com/cartify/update-quantity";
    try {
      const res = await axios.put(
        url,
        { productId, change },
        { headers: { Authorization: token } },
      );
      toast.success(res?.data?.message);
      fetchCartItems();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  //-----------------profile page------------------//
  const [customer, setCustomer] = useState("");
  const fetchUserDetail = async () => {
    const url = "https://cartify-vq4o.onrender.com/cartify/customer-details";
    try {
      const res = await axios.get(url, { headers: { Authorization: token } });
      setCustomer(res?.data?.customerDetail);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    if (token && role === "customer") {
      fetchUserDetail();
    }
  }, [token, role]);

  //------------------update customer profile-----------------------//
  const [profile, setProfile] = useState(null);

  const updateProfile = async () => {
    const formData = new FormData();
    formData.append("profile", profile);
    const url = "https://cartify-vq4o.onrender.com/cartify/update-image";
    try {
      const res = await axios.put(url, formData, {
        headers: { Authorization: token },
      });
      toast.success(res?.data);
      fetchUserDetail();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  //-----------------update customer details-----------------//
  const [updateCus, setUpdateCus] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    ConfirmPassword: "",
  });

  useEffect(() => {
    if (customer) {
      setUpdateCus({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [customer]);

  const updateCustomerDetails = async () => {
    const url = "https://cartify-vq4o.onrender.com/cartify/update-customer";
    try {
      const res = await axios.put(url, updateCus, {
        headers: { Authorization: token },
      });
      toast.success(res?.data?.message);
      fetchUserDetail();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  //-----------------update address--------------------//
  const [address, setAddress] = useState({
    address: "",
    state: "",
    pincode: "",
  });

  const updateAddress = async () => {
    const url = "https://cartify-vq4o.onrender.com/cartify/update-address";
    try {
      const res = await axios.put(url, address, {
        headers: { Authorization: token },
      });
      fetchUserDetail();
      toast.success(res?.data?.message);
      setAddress({
        address: "",
        state: "",
        pincode: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  //----------------delete address----------------//
  const deleteAddress = async (addressId) => {
    const url = "https://cartify-vq4o.onrender.com/cartify/delete-address";
    try {
      const res = await axios.put(
        url,
        { addressId },
        { headers: { Authorization: token } },
      );
      toast.success(res?.data?.message);
      fetchUserDetail();
      console.log(res?.data);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  //-----------------place order------------------//
  const placeOrder = async (buyProduct, cart) => {
    const url = "https://cartify-vq4o.onrender.com/cartify/place-order";
    try {
      const res = await axios.post(
        url,
        { buyProduct, cart, address },
        { headers: { Authorization: token } },
      );
      fetchCustomerOrder();
      toast.success(res?.data?.message);
      fetchCartItems();
      navigate("customer-dashboard/orders");
      console.log(res?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  //----------------fetch order-------------------//
  const [order, setOrder] = useState([]);
  const fetchCustomerOrder = async () => {
    const url = "https://cartify-vq4o.onrender.com/cartify/fetch-order";
    try {
      const res = await axios.get(url, { headers: { Authorization: token } });
      setOrder(res?.data?.orderRes);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    if (token && role === "customer") {
      fetchCustomerOrder();
    }
  }, [token, role]);

  //-------------------- delete customer order--------------------//
  const cancelCustomerOrder = async (orderId, status) => {
    const url = "https://cartify-vq4o.onrender.com/cartify/cancel-order";
    try {
      const cancelOrder = window.confirm(
        "Do you really want to cancel the order..??",
      );
      if (!cancelOrder) {
        return toast.info("Couldn't cancel your order..!!");
      }
      const res = await axios.put(
        url,
        { orderId, status },
        { headers: { Authorization: token } },
      );
      console.log(res?.data);
      toast.success(res?.data?.message);
      fetchCustomerOrder();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  //-------------------------place online orders------------------------//

  const placeOrderOnline = async (buyProduct, cart) => {
    const url = "https://cartify-vq4o.onrender.com/transaction/create-order";
    try {
      const res = await axios.post(
        url,
        { buyProduct, cart },
        { headers: { Authorization: token } },
      );
      console.log("Order response:", res.data);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // add in .env
        amount: res.data.order.amount,
        currency: res.data.order.currency,
        order_id: res.data.order.id,
        name: "Cartify Store",
        description: "Test Transaction",
        handler: async function (response) {
          // 3. Verify payment
          const verifyRes = await axios.post(
            "http://localhost:8000/transaction/verify-payment",
            response,
          );
          console.log("Verify response:", verifyRes.data);
          alert(verifyRes.data.message);
        },
        theme: { color: "#3399cc" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error?.response?.data || error.message);
      alert("Payment failed to start");
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        menu,
        products,
        singleProduct,
        wishlist,
        cart,
        customer,
        updateCus,
        profile,
        address,
        buyProduct,
        order,
        setBuyProduct,
        setAddress,
        setProfile,
        setUpdateCus,
        singleProductDetail,
        fetchProducts,
        deleteReview,
        addToWishlist,
        submitRating,
        fetchWishlist,
        removeFromWishlist,
        fetchCartItems,
        setMenu,
        addToCart,
        removeFromCart,
        manageCartQuantity,
        fetchUserDetail,
        updateProfile,
        updateCustomerDetails,
        updateAddress,
        deleteAddress,
        manageBuyNow,
        placeOrder,
        cancelCustomerOrder,
        placeOrderOnline,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCutomer = () => useContext(CustomerContext);
