import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import CusNavbar from "../Navbar/CusNavbar";
import { useCutomer } from "../../Context/CustomerContext";
import Footer from "../Footer/Footer";

export default function CustomerDashboard() {
  const { menu } = useCutomer();

  return (
    <div className="bg-slate-600">
      <div>
        <CusNavbar />
      </div>
      <div>
        {menu ? <Sidebar /> : ""}
        <div
          className={`flex-1 ${menu ? "ml-64" : ""} pt-20 p-6 min-h-screen bg-slate-600`}
        >
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
