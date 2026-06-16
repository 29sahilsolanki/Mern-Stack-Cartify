import { NavLink } from "react-router-dom";
import { useLogin } from "../../Context/LoginContext";
import { useCutomer } from "../../Context/CustomerContext";
import {
  FiHome,
  FiShoppingBag,
  FiPackage,
  FiHeart,
  FiShoppingCart,
  FiHeadphones,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

export default function Sidebar() {
  const { name, userLogout } = useLogin();
  const { menu, setMenu } = useCutomer();

  function handleClick() {
    setMenu(false);
    userLogout();
  }

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 relative group ${
      isActive
        ? "bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-600/5"
        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
    }`;

  const activeIndicator = (isActive) =>
    isActive && (
      <span className="absolute left-0 top-1/4 h-1/2 w-1 bg-indigo-600 rounded-r-full" />
    );

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-64 bg-slate-50/95 backdrop-blur-md text-gray-900 flex flex-col border-r border-gray-200/80 shadow-sm z-40 transition-transform duration-300 ${
        menu ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      {/* 1. USER METADATA HEADER */}
      <div className="pt-20 pb-5 px-6 border-b border-gray-200/60 bg-white">
        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 block">
          Authorized Account
        </span>
        <h2 className="text-base font-extrabold text-gray-900 tracking-tight mt-1 truncate">
          {name ? name.toUpperCase() : "GUEST USER"}
        </h2>
        <span className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-gray-500 border border-gray-200/50">
          Customer Console
        </span>
      </div>

      {/* 2. NAVIGATION LINKS GRID */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto pt-6">
        <NavLink
          to="/customer-dashboard"
          end
          onClick={() => setMenu(false)}
          className={linkStyle}
        >
          {({ isActive }) => (
            <>
              {activeIndicator(isActive)}
              <FiHome
                className={`text-lg ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`}
              />
              <span>Dashboard</span>
            </>
          )}
        </NavLink>

        <NavLink to="shop" onClick={() => setMenu(false)} className={linkStyle}>
          {({ isActive }) => (
            <>
              {activeIndicator(isActive)}
              <FiShoppingBag
                className={`text-lg ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`}
              />
              <span>Marketplace</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="orders"
          onClick={() => setMenu(false)}
          className={linkStyle}
        >
          {({ isActive }) => (
            <>
              {activeIndicator(isActive)}
              <FiPackage
                className={`text-lg ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`}
              />
              <span>My Orders</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="wishlist"
          onClick={() => setMenu(false)}
          className={linkStyle}
        >
          {({ isActive }) => (
            <>
              {activeIndicator(isActive)}
              <FiHeart
                className={`text-lg ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`}
              />
              <span>Wishlist Container</span>
            </>
          )}
        </NavLink>

        <NavLink to="cart" onClick={() => setMenu(false)} className={linkStyle}>
          {({ isActive }) => (
            <>
              {activeIndicator(isActive)}
              <FiShoppingCart
                className={`text-lg ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`}
              />
              <span>Shopping Cart</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="support"
          onClick={() => setMenu(false)}
          className={linkStyle}
        >
          {({ isActive }) => (
            <>
              {activeIndicator(isActive)}
              <FiHeadphones
                className={`text-lg ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`}
              />
              <span>Customer Support</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="profile"
          onClick={() => setMenu(false)}
          className={linkStyle}
        >
          {({ isActive }) => (
            <>
              {activeIndicator(isActive)}
              <FiUser
                className={`text-lg ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`}
              />
              <span>Account Profile</span>
            </>
          )}
        </NavLink>
      </nav>

      {/* 3. TERMINATE SESSION FOOTER */}
      <div className="p-4 border-t border-gray-200/60 bg-white">
        <button
          className="w-full bg-red-50 hover:bg-red-100 border border-red-100 hover:border-red-200 text-red-600 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all active:scale-98 flex items-center justify-center gap-2"
          onClick={handleClick}
        >
          <FiLogOut size={14} /> Logout Sahil
        </button>
      </div>
    </div>
  );
}
