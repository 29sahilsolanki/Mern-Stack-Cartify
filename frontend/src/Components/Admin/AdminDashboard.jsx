import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import AdminSidebar from "./AdminSidebar";
import { useAdmin } from "../../Context/AdminContext";
import Footer from "../Footer/Footer";

export default function AdminDashboard() {
  const { menu } = useAdmin();
  return (
    <div className="bg-slate-100">
      <div>
        <Navbar />
      </div>
      <div
        className={`flex-1 ${menu ? "ml-64" : ""} md:mt-16 p-6 min-h-screen`}
      >
        {menu ? <AdminSidebar /> : ""}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
