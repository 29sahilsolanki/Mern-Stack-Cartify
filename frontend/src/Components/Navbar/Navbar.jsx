import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import { useCutomer } from "../../Context/CustomerContext";
import { useAdmin } from "../../Context/AdminContext";
import { useLogin } from "../../Context/LoginContext";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const { userLogout, name } = useLogin();
  const { menu, setMenu } = useAdmin();

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-black via-gray-900 to-black px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-10">
        <button
          className="text-blue-500 text-2xl hover:text-indigo-500"
          onClick={() => {
            setMenu(!menu);
          }}
        >
          <GiHamburgerMenu />
        </button>
        <h1 className="text-white font-bold text-3xl tracking-wide">
          Cartify Admin
        </h1>
      </div>
      <NavLink
        to="/admin-dashboard/settings"
        className={({ isActive }) =>
          `text-2xl transition ${
            isActive
              ? "text-indigo-400 font-bold border-b-2 border-indigo-400"
              : "text-white hover:text-indigo-300"
          }`
        }
      >
        <FaRegUser />
      </NavLink>
    </nav>
  );
}
