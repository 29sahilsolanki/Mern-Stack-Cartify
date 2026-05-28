import {
  FaShoppingCart,
  FaUsers,
  FaBoxOpen,
  FaChartLine,
} from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { useAdmin } from "../../../Context/AdminContext";

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

  return (
    <div className="min-h-screen bg-slate-800 rounded-xl text-white p-6 sm:p-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-indigo-400">
        Admin Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card
          icon={<FaShoppingCart />}
          label="Orders"
          value={totalOrders}
          color="text-indigo-400"
        />
        <Card
          icon={<FaUsers />}
          label="Customers"
          value={totalCustomers}
          color="text-green-400"
        />
        <Card
          icon={<FaBoxOpen />}
          label="Products"
          value={totalProducts}
          color="text-pink-400"
        />
        <Card
          icon={<MdAttachMoney />}
          label="Revenue"
          value={`₹ ${totalRevenue.toLocaleString("en-IN")}`}
          color="text-yellow-400"
        />
      </div>

      {/* Order Status Breakdown */}
      <div className="bg-slate-900 rounded-xl p-6 shadow-md mb-10">
        <h2 className="text-lg sm:text-xl font-bold text-indigo-400 mb-4">
          Order Status Breakdown
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
          {Object.entries(statusBreakdown).map(([status, count]) => (
            <div key={status} className="bg-slate-700 p-4 rounded-lg shadow-md">
              <p className="text-gray-400 text-sm">{status}</p>
              <p className="text-xl font-bold text-indigo-400">{count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-slate-900 rounded-xl p-6 shadow-md mb-10">
        <h2 className="text-lg sm:text-xl font-bold text-indigo-400 mb-4">
          Recent Orders
        </h2>
        <div className="space-y-4">
          {orders.slice(0, 5).map((o) => (
            <div
              key={o._id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-800 p-4 rounded-lg shadow-md"
            >
              <p className="text-gray-300 font-semibold">Order Id: {o._id}</p>
              <div className="text-left sm:text-right">
                <p className="text-sm text-indigo-400">
                  Date: {new Date(o.createdAt).toLocaleDateString("en-GB")}
                </p>
                <p className="text-sm text-yellow-400">
                  Revenue: ₹ {o.total.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Tickets */}
      <div className="bg-slate-900 rounded-xl p-6 shadow-md">
        <h2 className="text-lg sm:text-xl font-bold text-indigo-400 mb-4">
          Recent Support Tickets
        </h2>
        <div className="space-y-4">
          {ticketInfo.slice(0, 5).map((t) => (
            <div
              key={t._id}
              className="bg-slate-800 p-4 rounded-lg shadow-md flex flex-col gap-2"
            >
              <p className="text-gray-300 text-sm">User: {t.user.name}</p>
              <p className="text-xs text-gray-400">Message: {t.message}</p>
              <p className="text-xs text-gray-400">Admin: {t.reply}</p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  t.status === "Open"
                    ? "bg-green-600 text-white"
                    : t.status === "Processing"
                      ? "bg-yellow-500 text-black"
                      : "bg-red-600 text-white"
                }`}
              >
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Reusable Card Component
function Card({ icon, label, value, color }) {
  return (
    <div className="bg-slate-900 p-6 rounded-xl shadow-md flex flex-col items-center">
      <div className={`text-3xl mb-2 ${color}`}>{icon}</div>
      <h2 className="text-sm font-semibold text-gray-400">{label}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
