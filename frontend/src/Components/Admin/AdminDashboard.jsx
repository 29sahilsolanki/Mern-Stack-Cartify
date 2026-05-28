import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import AdminSidebar from "./AdminSidebar";
import { useAdmin } from "../../Context/AdminContext";
import Footer from "../Footer/Footer";

export default function AdminDashboard() {
  const { menu } = useAdmin();
  return (
    <div className="bg-slate-600">
      <div>
        <Navbar />
      </div>
      <div
        className={`flex-1 ${menu ? "ml-64" : ""} pt-20 p-6 min-h-screen bg-slate-600`}
      >
        {menu ? <AdminSidebar /> : ""}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
