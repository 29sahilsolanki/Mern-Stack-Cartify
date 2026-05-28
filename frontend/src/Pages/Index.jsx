import { Outlet } from "react-router-dom";
import CusNavbar from "../Components/Navbar/CusNavbar";
import { useCutomer } from "../Context/CustomerContext";
import Footer from "../Components/Footer/Footer";

export default function Index() {
  const { menu } = useCutomer();
  return (
    <div className="min-h-screen bg-slate-700">
      <CusNavbar />
      <div className={`flex-1 ${menu ? "ml-64" : ""} pt-20 p-6 min-h-screen`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
