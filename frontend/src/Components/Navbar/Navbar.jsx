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
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-gray-200/80 shadow-sm transition-all duration-300">
      {/* Left Section (Hamburger + Branding) */}
      <div className="flex items-center gap-6 sm:gap-10">
        <button
          type="button"
          className="p-2 rounded-xl text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition cursor-pointer"
          onClick={() => {
            setMenu(!menu);
          }}
        >
          <GiHamburgerMenu size={20} />
        </button>

        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          <span className="text-gray-900">Cartify</span>
          <span className="text-indigo-600 font-medium text-base sm:text-lg ml-2 border-l border-gray-200 pl-2">
            Admin
          </span>
        </h1>
      </div>

      {/* Right Section (Profile Anchor NavLink) */}
      <NavLink
        to="/admin-dashboard/settings"
        className={({ isActive }) =>
          `p-2.5 rounded-xl transition-all ${
            isActive
              ? "bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-600/5 font-bold"
              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          }`
        }
      >
        <FaRegUser className="text-lg sm:text-xl" />
      </NavLink>
    </nav>
  );
}
