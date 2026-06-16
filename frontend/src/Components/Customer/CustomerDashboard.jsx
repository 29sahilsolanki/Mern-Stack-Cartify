import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import CusNavbar from "../Navbar/CusNavbar";
import { useCutomer } from "../../Context/CustomerContext";
import Footer from "../Footer/Footer";

export default function CustomerDashboard() {
  const { menu } = useCutomer();

  return (
    <div className="bg-slate-100">
      <div>
        <CusNavbar />
      </div>
      <div>
        {menu ? <Sidebar /> : ""}
        <div
          className={`flex-1 ${menu ? "md:ml-64" : ""} p-4 mt-30 md:mt-10 transition-all duration-300`}
        >
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
