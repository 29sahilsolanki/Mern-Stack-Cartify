import { useAdmin } from "../../../Context/AdminContext";

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

  return (
    <div className="flex-1 pt-2 mt-2 p-4 sm:p-6 min-h-screen bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 rounded-xl">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-6 mt-2 text-center">
        Order Reports
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-4 sm:p-6 rounded-xl shadow-lg text-white">
          <h2 className="text-sm sm:text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl sm:text-3xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-4 sm:p-6 rounded-xl shadow-lg text-white">
          <h2 className="text-sm sm:text-lg font-semibold">Total Revenue</h2>
          <p className="text-2xl sm:text-3xl font-bold">₹ {totalRevenue}</p>
        </div>
        <div className="bg-gradient-to-r from-pink-600 to-red-700 p-4 sm:p-6 rounded-xl shadow-lg text-white">
          <h2 className="text-sm sm:text-lg font-semibold">Total Customers</h2>
          <p className="text-2xl sm:text-3xl font-bold">{totalCustomers}</p>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="bg-slate-800 rounded-xl p-4 sm:p-6 shadow-lg mb-10">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
          Order Status Breakdown
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
          <div className="bg-slate-700 p-3 sm:p-4 rounded-lg shadow-md hover:border-indigo-500 border border-slate-600 transition-all">
            <p className="text-gray-400 text-xs sm:text-sm">Pending</p>
            <p className="text-lg sm:text-xl font-bold text-indigo-400">
              {Pending}
            </p>
          </div>
          <div className="bg-slate-700 p-3 sm:p-4 rounded-lg shadow-md hover:border-indigo-500 border border-slate-600 transition-all">
            <p className="text-gray-400 text-xs sm:text-sm">Processing</p>
            <p className="text-lg sm:text-xl font-bold text-indigo-400">
              {Processing}
            </p>
          </div>
          <div className="bg-slate-700 p-3 sm:p-4 rounded-lg shadow-md hover:border-indigo-500 border border-slate-600 transition-all">
            <p className="text-gray-400 text-xs sm:text-sm">Shipped</p>
            <p className="text-lg sm:text-xl font-bold text-indigo-400">
              {Shipped}
            </p>
          </div>
          <div className="bg-slate-700 p-3 sm:p-4 rounded-lg shadow-md hover:border-indigo-500 border border-slate-600 transition-all">
            <p className="text-gray-400 text-xs sm:text-sm">Delivered</p>
            <p className="text-lg sm:text-xl font-bold text-indigo-400">
              {Delivered}
            </p>
          </div>
          <div className="bg-slate-700 p-3 sm:p-4 rounded-lg shadow-md hover:border-indigo-500 border border-slate-600 transition-all">
            <p className="text-gray-400 text-xs sm:text-sm">Cancelled</p>
            <p className="text-lg sm:text-xl font-bold text-indigo-400">
              {Cancelled}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-slate-800 rounded-xl p-4 sm:p-6 shadow-lg">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
          Recent Orders
        </h2>
        <div className="space-y-4">
          {orders.slice(0, 5).map((order) => (
            <div
              key={order._id}
              className="flex flex-col sm:flex-row justify-between sm:items-center bg-slate-700 p-4 rounded-lg shadow-md hover:border-indigo-500 border border-slate-600 transition-all gap-2"
            >
              <p className="text-gray-300 font-semibold text-sm sm:text-base">
                Order Id: {order._id}
              </p>
              <div className="text-left sm:text-right text-xs sm:text-sm">
                <p className="text-indigo-400">
                  Date: {new Date(order.createdAt).toLocaleDateString("en-GB")}
                </p>
                <p className="text-yellow-400">
                  Revenue: ₹ {order.total.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
