import { useEffect, useState } from "react";
import { useAdmin } from "../../../Context/AdminContext";

export default function Order() {
  const { date, setDate, updateOrderStatus, fetchOrderByDate, fetchAllOrder } =
    useAdmin();
  const [search, setSearch] = useState("");
  const { orders } = useAdmin();

  useEffect(() => {
    if (search) {
      setDate("");
    }
    if (!search) {
      fetchAllOrder();
    }
  }, [search]);

  const summary = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "Pending").length,
    processing: orders.filter((o) => o.status === "Processing").length,
    shipped: orders.filter((o) => o.status === "Shipped").length,
    delivered: orders.filter((o) => o.status === "Delivered").length,
    cancelled: orders.filter((o) => o.status === "Cancelled").length,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Orders Summary</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-slate-800 p-4 rounded-lg text-center shadow-md">
          <p className="text-gray-400 text-xs sm:text-sm">Total Orders</p>
          <p className="text-lg sm:text-xl font-bold text-indigo-400">
            {summary.total}
          </p>
        </div>
        <div className="bg-yellow-600 p-4 rounded-lg text-center shadow-md">
          <p className="text-black text-xs sm:text-sm">Pending</p>
          <p className="text-lg sm:text-xl font-bold text-black">
            {summary.pending}
          </p>
        </div>
        <div className="bg-blue-600 p-4 rounded-lg text-center shadow-md">
          <p className="text-white text-xs sm:text-sm">Processing</p>
          <p className="text-lg sm:text-xl font-bold text-white">
            {summary.processing}
          </p>
        </div>
        <div className="bg-purple-600 p-4 rounded-lg text-center shadow-md">
          <p className="text-white text-xs sm:text-sm">Shipped</p>
          <p className="text-lg sm:text-xl font-bold text-white">
            {summary.shipped}
          </p>
        </div>
        <div className="bg-green-600 p-4 rounded-lg text-center shadow-md">
          <p className="text-white text-xs sm:text-sm">Delivered</p>
          <p className="text-lg sm:text-xl font-bold text-white">
            {summary.delivered}
          </p>
        </div>
        <div className="bg-red-600 p-4 rounded-lg text-center shadow-md">
          <p className="text-white text-xs sm:text-sm">Cancelled</p>
          <p className="text-lg sm:text-xl font-bold text-white">
            {summary.cancelled}
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="w-full bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 p-4 rounded-lg shadow-md mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
        />
        <input
          type="text"
          placeholder="Enter Order ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
        />
        <button
          onClick={() => {
            if (search) {
              setDate("");
              fetchOrderByDate(search);
            }
          }}
          className="px-6 py-2 bg-indigo-600 rounded-md text-white hover:bg-indigo-700 transition w-full sm:w-auto"
        >
          Search
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders && orders.length > 0 ? (
          <>
            {orders?.map((order) => (
              <div
                key={order._id}
                className={`bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 rounded-lg shadow-md p-6 text-white ${
                  order.status === "Cancelled"
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold">
                      Order ID: {order._id}
                    </h2>
                    <p className="text-xs text-gray-400">
                      Date:{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-GB")}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                      disabled={order.status === "Cancelled"}
                      className={`px-3 py-1 rounded-md text-xs sm:text-sm font-bold bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        order.status === "Cancelled" ? "cursor-not-allowed" : ""
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    <span
                      className={`px-3 py-1 rounded-md text-xs font-bold ${
                        order.status === "Pending"
                          ? "bg-yellow-600 text-black"
                          : order.status === "Processing"
                            ? "bg-blue-600 text-white"
                            : order.status === "Shipped"
                              ? "bg-purple-600 text-white"
                              : order.status === "Delivered"
                                ? "bg-green-600 text-white"
                                : "bg-red-600 text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Products */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-indigo-400 mb-2">
                    Products
                  </h3>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                    {order?.items?.map((p) => (
                      <div
                        key={p._id}
                        className="flex items-center gap-3 bg-slate-700 rounded-md p-3 shadow-md hover:shadow-lg transition w-full sm:w-auto"
                      >
                        <img
                          src={p?.product?.image}
                          alt={p?.product?.title}
                          className="w-16 h-16 object-contain rounded"
                        />
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold truncate max-w-[150px]">
                            {p?.product?.title}
                          </p>
                          <p className="text-xs text-gray-300 mt-1">
                            Qty: {p.quantity} | ₹{p.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Details */}
                <div>
                  <h3 className="text-sm font-semibold text-indigo-400 mb-2">
                    Customer Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-300">
                    <p>Name: {order?.user?.name}</p>
                    <p>Email: {order?.user?.email}</p>
                    <p>Phone: {order?.user?.phone}</p>
                    <p>Address: {order?.address?.address}</p>
                    <p>State: {order?.address?.state}</p>
                    <p>Pincode: {order?.address?.pincode}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <span className="block text-center bg-slate-800 rounded-lg p-6 shadow-md text-gray-400 text-sm sm:text-base">
            <div className="flex flex-col items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.3h12.2M7 13h10m-6 6a1 1 0 11-2 0 1 1 0 012 0zm6 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
              <p className="font-semibold text-white">No orders found</p>
              <p className="text-xs text-gray-400">
                Looks like there are no orders to display right now.
              </p>
            </div>
          </span>
        )}
      </div>
    </div>
  );
}
