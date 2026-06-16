import { Outlet } from "react-router-dom";
import CusNavbar from "../Components/Navbar/CusNavbar";
import { useCutomer } from "../Context/CustomerContext";
import Footer from "../Components/Footer/Footer";

export default function Index() {
  const { menu } = useCutomer();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <CusNavbar />
      <div
        className={`flex-1 ${menu ? "md:ml-64" : ""} p-4 mt-35 md:mt-10 transition-all duration-300`}
      >
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
