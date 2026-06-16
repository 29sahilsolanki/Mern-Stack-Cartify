import { useAdmin } from "../../../Context/AdminContext";
import {
  FiBarChart2,
  FiTrendingUp,
  FiUsers,
  FiBox,
  FiClock,
  FiCalendar,
} from "react-icons/fi";

export default function Reports() {
  const { orders, customers } = useAdmin();

  // Calculations
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, p) => sum + p.total, 0);
  const totalCustomers = customers.length;
  const Pending = orders.filter((p) => p.status === "Pending").length;
  const Processing = orders.filter((p) => p.status === "Processing").length;
  const Shipped = orders.filter((p) => p.status === "Shipped").length;
  const Delivered = orders.filter((p) => p.status === "Delivered").length;
  const Cancelled = orders.filter((p) => p.status === "Cancelled").length;

  const getStatusCardStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "text-emerald-600 bg-emerald-50/50 border-emerald-100";
      case "Pending":
        return "text-amber-600 bg-amber-50/50 border-amber-100";
      case "Cancelled":
        return "text-red-600 bg-red-50/50 border-red-100";
      case "Processing":
        return "text-blue-600 bg-blue-50/50 border-blue-100";
      default:
        return "text-purple-600 bg-purple-50/50 border-purple-100";
    }
  };

  return (
    <div className=" text-gray-900 min-h-screen p-4 pt-24 pb-12 sm:p-8 font-sans antialiased">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header Panel */}
        <div className="w-full bg-slate-50 border border-gray-200/60 px-6 py-5 rounded-2xl shadow-sm flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl text-xl">
            <FiBarChart2 />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
              Order Reports
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Comprehensive audit breakdown of platform commerce metrics
            </p>
          </div>
        </div>

        {/* Summary Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div className="bg-white border border-gray-200/80 p-6 rounded-2xl shadow-sm flex flex-col items-center text-center">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl text-lg mb-3">
              <FiBox />
            </div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Orders
            </h2>
            <p className="text-2xl font-black text-gray-900 tracking-tight mt-1">
              {totalOrders}
            </p>
          </div>

          <div className="bg-white border border-gray-200/80 p-6 rounded-2xl shadow-sm flex flex-col items-center text-center">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl text-lg mb-3">
              <FiTrendingUp />
            </div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Revenue
            </h2>
            <p className="text-2xl font-black text-gray-900 tracking-tight mt-1">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="bg-white border border-gray-200/80 p-6 rounded-2xl shadow-sm flex flex-col items-center text-center">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl text-lg mb-3">
              <FiUsers />
            </div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Customers
            </h2>
            <p className="text-2xl font-black text-gray-900 tracking-tight mt-1">
              {totalCustomers}
            </p>
          </div>
        </div>

        {/* Order Status Breakdown Container */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 tracking-tight mb-4">
            Order Status Breakdown
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
            <div
              className={`border p-4 rounded-xl shadow-xs transition-all ${getStatusCardStyle("Pending")}`}
            >
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                Pending
              </p>
              <p className="text-2xl font-black mt-1">{Pending}</p>
            </div>
            <div
              className={`border p-4 rounded-xl shadow-xs transition-all ${getStatusCardStyle("Processing")}`}
            >
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                Processing
              </p>
              <p className="text-2xl font-black mt-1">{Processing}</p>
            </div>
            <div
              className={`border p-4 rounded-xl shadow-xs transition-all ${getStatusCardStyle("Shipped")}`}
            >
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                Shipped
              </p>
              <p className="text-2xl font-black mt-1">{Shipped}</p>
            </div>
            <div
              className={`border p-4 rounded-xl shadow-xs transition-all ${getStatusCardStyle("Delivered")}`}
            >
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                Delivered
              </p>
              <p className="text-2xl font-black mt-1">{Delivered}</p>
            </div>
            <div
              className={`border p-4 rounded-xl shadow-xs transition-all ${getStatusCardStyle("Cancelled")}`}
            >
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                Cancelled
              </p>
              <p className="text-2xl font-black mt-1">{Cancelled}</p>
            </div>
          </div>
        </div>

        {/* Recent Activity Feed Block */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <FiClock className="text-indigo-600" />
            <h2 className="text-base font-bold text-gray-900 tracking-tight">
              Recent Orders
            </h2>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order._id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50 border border-slate-200/40 p-4 rounded-xl transition-all hover:bg-white hover:border-indigo-200 hover:shadow-md gap-2"
              >
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Order Reference
                  </p>
                  <p className="text-sm font-mono font-semibold text-gray-700 truncate max-w-50 sm:max-w-xs">
                    Order Id: {order._id}
                  </p>
                </div>
                <div className="text-left sm:text-right font-medium">
                  <p className="text-xs text-gray-400 flex items-center sm:justify-end gap-1 font-mono">
                    <FiCalendar size={12} />{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-GB")}
                  </p>
                  <p className="text-sm font-extrabold text-indigo-600 mt-0.5">
                    Revenue: ₹ {order.total.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
