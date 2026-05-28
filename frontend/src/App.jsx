import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { AdminProvider } from "./Context/AdminContext";
import Home from "./Pages/Home";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import { LoginProvider } from "./Context/LoginContext";
import Login from "./Pages/Login";
import CustomerDashboard from "./Components/Customer/CustomerDashboard";
import Register from "./Pages/Register";
import AdminRoute from "./Components/Routes/AdminRoute";
import CustomerRoute from "./Components/Routes/CustomerRoute";
import PublicRoute from "./Components/Routes/PublicRoute";
import Dashboard from "./Components/Admin/Nested/Dashboard";
import Order from "./Components/Admin/Nested/Orders";
import ManageInventory from "./Components/Admin/Nested/ManageInventory";
import Reports from "./Components/Admin/Nested/Reports";
import Customers from "./Components/Admin/Nested/Customers";
import Settings from "./Components/Admin/Nested/Settings";
import Orders from "./Components/Customer/Nested/Orders";
import Wishlist from "./Components/Customer/Nested/Wishlist";
import Cart from "./Components/Customer/Nested/Cart";
import Support from "./Components/Customer/Nested/Support";
import Profile from "./Components/Customer/Nested/Profile";
import { CustomerProvider } from "./Context/CustomerContext";
import UploadProducts from "./Components/Admin/Nested/UploadProducts";
import Index from "./Pages/Index";
import CusNavbar from "./Components/Navbar/CusNavbar";
import Shop from "./Pages/Shop";
import ProductDetail from "./Pages/ProductDetail";
import Checkout from "./Components/Customer/Nested/Checkout";
import EditProfile from "./Components/Customer/Nested/EditProfile";
import EditProducts from "./Components/Admin/Nested/EditProducts";
import { SupportProvider } from "./Context/SupportContext";
import CustomerDetails from "./Components/Admin/Nested/CustomerDetails";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <LoginProvider>
        <AdminProvider>
          <CustomerProvider>
            <SupportProvider>
              <Routes>
                <Route
                  element={
                    <PublicRoute>
                      <Index />
                    </PublicRoute>
                  }
                >
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route
                    path="/login"
                    element={
                      <PublicRoute>
                        <Login />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <PublicRoute>
                        <Register />
                      </PublicRoute>
                    }
                  />
                  <Route path="/product-detail" element={<ProductDetail />} />
                </Route>
                <Route
                  path="/admin-dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="customers" element={<Customers />} />
                  <Route
                    path="customer-details"
                    element={<CustomerDetails />}
                  />
                  <Route path="inventory" element={<ManageInventory />} />
                  <Route path="upload-products" element={<UploadProducts />} />
                  <Route path="edit-product" element={<EditProducts />} />
                  <Route path="orders" element={<Order />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
                <Route
                  path="/customer-dashboard"
                  element={
                    <CustomerRoute>
                      <CustomerDashboard />
                    </CustomerRoute>
                  }
                >
                  <Route index element={<Home />} />
                  <Route path="shop" element={<Shop />} />
                  <Route path="product-detail" element={<ProductDetail />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="support" element={<Support />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="edit-profile" element={<EditProfile />} />
                </Route>
              </Routes>
            </SupportProvider>
          </CustomerProvider>
        </AdminProvider>
      </LoginProvider>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
export default App;
