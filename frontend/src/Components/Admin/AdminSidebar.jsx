import { NavLink } from "react-router-dom";
import { useLogin } from "../../Context/LoginContext";
import { useAdmin } from "../../Context/AdminContext";

export default function AdminSidebar() {
  const { name, userLogout } = useLogin();
  const { menu, setMenu } = useAdmin();
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-slate-800 via-gray-900 to-black text-white flex flex-col shadow-lg z-40">
      <nav className="flex-1 mt-20 p-4 space-y-2">
        {/* mt-20 => Navbar ki height ke niche se start hoga */}
        <NavLink
          to="/admin-dashboard"
          end
          onClick={() => setMenu(false)}
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive ? "bg-slate-700 font-semibold" : "hover:bg-slate-600"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="customers"
          onClick={() => setMenu(false)}
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive ? "bg-slate-700 font-semibold" : "hover:bg-slate-600"
            }`
          }
        >
          Customers
        </NavLink>

        <NavLink
          to="inventory"
          onClick={() => setMenu(false)}
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive ? "bg-slate-700 font-semibold" : "hover:bg-slate-600"
            }`
          }
        >
          Inventory
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
          Orders
        </NavLink>

        <NavLink
          to="reports"
          onClick={() => setMenu(false)}
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive ? "bg-slate-700 font-semibold" : "hover:bg-slate-600"
            }`
          }
        >
          Reports
        </NavLink>

        <NavLink
          to="settings"
          onClick={() => setMenu(false)}
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive ? "bg-slate-700 font-semibold" : "hover:bg-slate-600"
            }`
          }
        >
          Settings
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <button
          className="w-full bg-red-600 py-2 rounded-md hover:bg-red-700 transition duration-200"
          onClick={() => {
            setMenu(false);
            userLogout();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
