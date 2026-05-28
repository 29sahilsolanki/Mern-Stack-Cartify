import { NavLink } from "react-router-dom";
import { useLogin } from "../../Context/LoginContext";
import { useCutomer } from "../../Context/CustomerContext";

export default function Sidebar() {
  const { name, userLogout } = useLogin();
  const { menu, setMenu } = useCutomer();

  function handleClick() {
    setMenu(false);
    userLogout();
  }

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-slate-800 via-gray-900 to-black text-white flex flex-col shadow-lg z-40">
      <div className="mt-12 sm:mt-16 px-4 py-3 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Welcome {name.toUpperCase()}</h2>
        <p className="text-sm text-gray-400">Customer</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/customer-dashboard"
          end
          onClick={() => setMenu(false)}
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive ? "bg-slate-700 font-semibold" : "hover:bg-slate-600"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="shop"
          onClick={() => setMenu(false)}
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive ? "bg-slate-700 font-semibold" : "hover:bg-slate-600"
            }`
          }
        >
          Shop
        </NavLink>

        <NavLink
          to="orders"
          onClick={() => setMenu(false)}
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive ? "bg-slate-700 font-semibold" : "hover:bg-slate-600"
            }`
          }
        >
          My Orders
        </NavLink>

        <NavLink
          to="wishlist"
          onClick={() => setMenu(false)}
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive ? "bg-slate-700 font-semibold" : "hover:bg-slate-600"
            }`
          }
        >
          Wishlist
        </NavLink>

        <NavLink
          to="cart"
          onClick={() => setMenu(false)}
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive ? "bg-slate-700 font-semibold" : "hover:bg-slate-600"
            }`
          }
        >
          Cart
        </NavLink>

        <NavLink
          to="support"
          onClick={() => setMenu(false)}
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive ? "bg-slate-700 font-semibold" : "hover:bg-slate-600"
            }`
          }
        >
          Support
        </NavLink>

        <NavLink
          to="profile"
          onClick={() => setMenu(false)}
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive ? "bg-slate-700 font-semibold" : "hover:bg-slate-600"
            }`
          }
        >
          Profile
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 mt-auto">
        <button
          className="w-full bg-red-600 py-2 rounded-md hover:bg-red-700 transition duration-200"
          onClick={handleClick}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
