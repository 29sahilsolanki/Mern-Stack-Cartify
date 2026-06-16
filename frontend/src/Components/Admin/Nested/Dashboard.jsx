import {
  FaShoppingCart,
  FaUsers,
  FaBoxOpen,
  FaChartLine,
} from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { useAdmin } from "../../../Context/AdminContext";
import {
  FiActivity,
  FiUsers,
  FiPackage,
  FiDollarSign,
  FiClock,
  FiHelpCircle,
  FiCalendar,
} from "react-icons/fi";

export default function Dashboard() {
  const { products, customers, orders, admin, ticketInfo } = useAdmin();

  // Calculations
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalCustomers = customers.length;
  const totalProducts = products.length;

  const statusBreakdown = {
    Pending: orders.filter((o) => o.status === "Pending").length,
    Processing: orders.filter((o) => o.status === "Processing").length,
    Shipped: orders.filter((o) => o.status === "Shipped").length,
    Delivered: orders.filter((o) => o.status === "Delivered").length,
    Cancelled: orders.filter((o) => o.status === "Cancelled").length,
  };

  const getTicketStatusStyle = (status) => {
    switch (status) {
      case "Open":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Processing":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-red-50 text-red-700 border-red-200";
    }
  };

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
            <FiActivity />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Overview of global platform acquisition performance metrics
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card
            icon={<FaShoppingCart />}
            label="Orders"
            value={totalOrders}
            color="text-indigo-600 bg-indigo-50 border-indigo-100/70"
          />
          <Card
            icon={<FaUsers />}
            label="Customers"
            value={totalCustomers}
            color="text-indigo-600 bg-indigo-50 border-indigo-100/70"
          />
          <Card
            icon={<FaBoxOpen />}
            label="Products"
            value={totalProducts}
            color="text-indigo-600 bg-indigo-50 border-indigo-100/70"
          />
          <Card
            icon={<MdAttachMoney />}
            label="Revenue"
            value={`₹ ${totalRevenue.toLocaleString("en-IN")}`}
            color="text-indigo-600 bg-indigo-50 border-indigo-100/70"
          />
        </div>

        {/* Order Status Breakdown */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 tracking-tight mb-4">
            Order Status Breakdown
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
            {Object.entries(statusBreakdown).map(([status, count]) => (
              <div
                key={status}
                className={`border p-4 rounded-xl shadow-xs transition-all ${getStatusCardStyle(status)}`}
              >
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  {status}
                </p>
                <p className="text-2xl font-black mt-1">{count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Flex Split Grid for Recent Activity Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders List Box */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <FiClock className="text-indigo-600" />
              <h2 className="text-base font-bold text-gray-900 tracking-tight">
                Recent Orders
              </h2>
            </div>

            <div className="space-y-3">
              {orders.slice(0, 5).map((o) => (
                <div
                  key={o._id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50 border border-slate-200/40 p-4 rounded-xl transition-all hover:bg-slate-100/50"
                >
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Order Reference
                    </p>
                    <p className="text-sm font-mono font-semibold text-gray-700 truncate max-w-50 sm:max-w-xs">
                      {o._id}
                    </p>
                  </div>
                  <div className="text-left sm:text-right mt-2 sm:mt-0 font-medium">
                    <p className="text-xs text-gray-400 flex items-center sm:justify-end gap-1 font-mono">
                      <FiCalendar size={12} />{" "}
                      {new Date(o.createdAt).toLocaleDateString("en-GB")}
                    </p>
                    <p className="text-sm font-extrabold text-indigo-600 mt-0.5">
                      ₹{o.total.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support Tickets List Box */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <FiHelpCircle className="text-indigo-600" />
              <h2 className="text-base font-bold text-gray-900 tracking-tight">
                Recent Support Tickets
              </h2>
            </div>

            <div className="space-y-3">
              {ticketInfo.slice(0, 5).map((t) => (
                <div
                  key={t._id}
                  className="bg-slate-50 border border-slate-200/40 p-4 rounded-xl flex flex-col gap-2.5 transition-all hover:bg-slate-100/50"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-bold text-gray-800">
                      User:{" "}
                      <span className="font-medium text-gray-500">
                        {t.user.name}
                      </span>
                    </p>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getTicketStatusStyle(t.status)}`}
                    >
                      {t.status}
                    </span>
                  </div>

                  <div className="text-xs space-y-1 bg-white border border-gray-100 p-2.5 rounded-lg font-light text-gray-600">
                    <p>
                      <span className="font-bold text-gray-700 text-[10px] uppercase tracking-wider mr-1">
                        Query:
                      </span>{" "}
                      {t.message}
                    </p>
                    <p className="text-indigo-600 font-normal">
                      <span className="font-bold text-indigo-700 text-[10px] uppercase tracking-wider mr-1">
                        Reply:
                      </span>{" "}
                      {t.reply}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Card Component
function Card({ icon, label, value, color }) {
  return (
    <div className="bg-white border border-gray-200/80 p-6 rounded-2xl shadow-sm flex flex-col items-center text-center">
      <div
        className={`p-3.5 rounded-xl border text-xl mb-3 flex items-center justify-center ${color}`}
      >
        {icon}
      </div>
      <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
        {label}
      </h2>
      <p className="text-2xl font-black text-gray-900 tracking-tight mt-1">
        {value}
      </p>
    </div>
  );
}
