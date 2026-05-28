import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { useCutomer } from "../../Context/CustomerContext";
import { useLogin } from "../../Context/LoginContext";
import { NavLink } from "react-router-dom";

export default function CusNavbar() {
  const { menu, setMenu } = useCutomer();
  const { token } = useLogin();

  const navLinkClasses = ({ isActive }) =>
    `flex flex-col items-center transition-colors duration-200 ${
      isActive ? "text-blue-500" : "text-white hover:text-blue-500"
    }`;

  return (
    <div className="fixed top-0 w-full z-50 flex justify-between items-center bg-gradient-to-r from-black via-gray-900 to-black px-3 sm:px-5 py-2 sm:py-3 shadow-md">
      {/* Left side: logo + hamburger */}
      <div className="flex items-center gap-4 sm:gap-6">
        {token && (
          <button
            type="button"
            className="text-2xl text-blue-500 hover:text-blue-700 transition-colors duration-200"
            onClick={() => setMenu(!menu)}
          >
            <GiHamburgerMenu />
          </button>
        )}

        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-white">
          Cartify
        </h1>
      </div>

      {/* Right side: icons */}
      <div className="flex items-center gap-6 sm:gap-10">
        <NavLink to="/customer-dashboard/wishlist" className={navLinkClasses}>
          <FaRegHeart className="text-lg sm:text-xl" />
          <span className="text-xs sm:text-sm">Wishlist</span>
        </NavLink>
        <NavLink to="/customer-dashboard/cart" className={navLinkClasses}>
          <BsCartCheck className="text-lg sm:text-xl" />
          <span className="text-xs sm:text-sm">Cart</span>
        </NavLink>
        <NavLink to="/customer-dashboard/profile" className={navLinkClasses}>
          <FaRegUser className="text-lg sm:text-xl" />
          <span className="text-xs sm:text-sm">Profile</span>
        </NavLink>
      </div>
    </div>
  );
}
