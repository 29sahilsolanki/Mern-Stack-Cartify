import { NavLink } from "react-router-dom";
import { useLogin } from "../../Context/LoginContext";
import { useAdmin } from "../../Context/AdminContext";
import {
  FiPieChart,
  FiUsers,
  FiLayers,
  FiShoppingBag,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

export default function AdminSidebar() {
  const { name, userLogout } = useLogin();
  const { menu, setMenu } = useAdmin();

  // रीयूजेबल लिंक स्टाइलिंग - एक्टिव होने पर इंडिगो ग्लो और लेफ्ट बॉर्डर देगा
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 relative group ${
      isActive
        ? "bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-600/5"
        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
    }`;

  // एक्टिव लिंक के लेफ्ट साइड में दिखने वाला बारीक इंडिगो इंडिकेटर बार
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
      {/* NAVIGATION NODE LINKS */}
      {/* mt-20 => Navbar ki height ke niche se start hoga */}
      <nav className="flex-1 mt-20 p-4 space-y-1 overflow-y-auto pt-4">
        <NavLink
          to="/admin-dashboard"
          end
          onClick={() => setMenu(false)}
          className={linkStyle}
        >
          {({ isActive }) => (
            <>
              {activeIndicator(isActive)}
              <FiPieChart
                className={`text-lg ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`}
              />
              <span>Dashboard</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="customers"
          onClick={() => setMenu(false)}
          className={linkStyle}
        >
          {({ isActive }) => (
            <>
              {activeIndicator(isActive)}
              <FiUsers
                className={`text-lg ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`}
              />
              <span>Customers</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="inventory"
          onClick={() => setMenu(false)}
          className={linkStyle}
        >
          {({ isActive }) => (
            <>
              {activeIndicator(isActive)}
              <FiLayers
                className={`text-lg ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`}
              />
              <span>Inventory</span>
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
              <FiShoppingBag
                className={`text-lg ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`}
              />
              <span>Orders</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="reports"
          onClick={() => setMenu(false)}
          className={linkStyle}
        >
          {({ isActive }) => (
            <>
              {activeIndicator(isActive)}
              <FiBarChart2
                className={`text-lg ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`}
              />
              <span>Reports</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="settings"
          onClick={() => setMenu(false)}
          className={linkStyle}
        >
          {({ isActive }) => (
            <>
              {activeIndicator(isActive)}
              <FiSettings
                className={`text-lg ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`}
              />
              <span>Settings</span>
            </>
          )}
        </NavLink>
      </nav>

      {/* Footer / Terminate Session Action */}
      <div className="p-4 border-t border-gray-200/60 bg-white">
        <button
          type="button"
          className="w-full bg-red-50 hover:bg-red-100 border border-red-100 hover:border-red-200 text-red-600 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          onClick={() => {
            setMenu(false);
            userLogout();
          }}
        >
          <FiLogOut size={14} /> Logout
        </button>
      </div>
    </div>
  );
}
