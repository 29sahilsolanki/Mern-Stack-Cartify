import { useEffect, useState } from "react";
import { useAdmin } from "../../../Context/AdminContext";
import { FiBox, FiSearch, FiCalendar, FiUser, FiMapPin } from "react-icons/fi";

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

  const getStatusClasses = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Processing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Shipped":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="text-gray-900 min-h-screen p-4 pt-24 pb-12 sm:p-8 font-sans antialiased">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header Panel */}
        <div className="w-full bg-slate-50 border border-gray-200/60 px-6 py-5 rounded-2xl shadow-sm flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl text-xl">
            <FiBox />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
              Orders Summary
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Monitor, track, and update live consumer transaction data
              pipelines
            </p>
          </div>
        </div>

        {/* Summary Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white border border-gray-200/80 p-4 rounded-xl text-center shadow-xs">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
              Total Orders
            </p>
            <p className="text-xl font-black text-gray-900 mt-1">
              {summary.total}
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-center shadow-xs">
            <p className="text-amber-700 text-xs font-bold uppercase tracking-wider">
              Pending
            </p>
            <p className="text-xl font-black text-amber-800 mt-1">
              {summary.pending}
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center shadow-xs">
            <p className="text-blue-700 text-xs font-bold uppercase tracking-wider">
              Processing
            </p>
            <p className="text-xl font-black text-blue-800 mt-1">
              {summary.processing}
            </p>
          </div>
          <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl text-center shadow-xs">
            <p className="text-purple-700 text-xs font-bold uppercase tracking-wider">
              Shipped
            </p>
            <p className="text-xl font-black text-purple-800 mt-1">
              {summary.shipped}
            </p>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center shadow-xs">
            <p className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
              Delivered
            </p>
            <p className="text-xl font-black text-emerald-800 mt-1">
              {summary.delivered}
            </p>
          </div>
          <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-center shadow-xs">
            <p className="text-red-700 text-xs font-bold uppercase tracking-wider">
              Cancelled
            </p>
            <p className="text-xl font-black text-red-800 mt-1">
              {summary.cancelled}
            </p>
          </div>
        </div>

        {/* Operational Toolbar & Filter Form */}
        <div className="w-full bg-slate-50 border border-gray-200/60 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer w-full sm:w-auto"
          />
          <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
            <input
              type="text"
              placeholder="Search by precise Order ID parameters..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="grow outline-none text-sm bg-transparent text-gray-800 placeholder-gray-400 font-medium"
            />
            <FiSearch className="text-gray-400 text-lg ml-2" />
          </div>
          <button
            type="button"
            onClick={() => {
              if (search) {
                setDate("");
                fetchOrderByDate(search);
              }
            }}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shadow-indigo-600/10 transition-all active:scale-98 w-full sm:w-auto cursor-pointer"
          >
            Search
          </button>
        </div>

        {/* Feed List Output Stream */}
        <div className="space-y-5">
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className={`bg-white border rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 ${
                  order.status === "Cancelled"
                    ? "opacity-55 bg-slate-50/50 border-gray-200 pointer-events-none shadow-none"
                    : "border-gray-200/80 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Order Main Header Meta */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-3 border-b border-gray-100 mb-4 gap-3">
                  <div>
                    <h2 className="text-sm font-bold text-gray-900 tracking-tight font-mono">
                      Order ID:{" "}
                      <span className="text-gray-500 font-normal">
                        {order._id}
                      </span>
                    </h2>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1 font-mono">
                      <FiCalendar size={12} /> Date:{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-GB")}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                      disabled={order.status === "Cancelled"}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white border border-gray-200 text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer ${
                        order.status === "Cancelled"
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusClasses(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Grid Architecture for Internal Data Blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-1">
                  {/* Left Column: Products Sub-Iteration array */}
                  <div className="space-y-3">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 border-b border-slate-50 pb-1 flex items-center gap-1">
                      <FiBox /> Product Artifacts
                    </h3>
                    <div className="space-y-2 max-h-55 overflow-y-auto pr-1">
                      {order?.items?.map((p) => (
                        <div
                          key={p._id}
                          className="flex items-center gap-3 bg-slate-50 border border-slate-200/40 rounded-xl p-2.5"
                        >
                          <div className="w-12 h-12 bg-white border border-gray-100 rounded-lg p-1 overflow-hidden flex items-center justify-center shrink-0">
                            <img
                              src={p?.product?.image}
                              alt={p?.product?.title}
                              className="max-h-full max-w-full object-contain mix-blend-multiply"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-gray-900 truncate">
                              {p?.product?.title}
                            </p>
                            <p className="text-[11px] font-medium text-gray-400 font-mono mt-0.5">
                              Qty:{" "}
                              <span className="text-gray-700 font-bold">
                                {p.quantity}
                              </span>{" "}
                              | Price:{" "}
                              <span className="text-indigo-600 font-bold">
                                ₹{p.price?.toLocaleString("en-IN")}
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-dashed border-gray-100 flex justify-between items-center text-xs">
                      <span className="font-bold text-gray-400 uppercase tracking-wider">
                        Total Yield Net Value:
                      </span>
                      <span className="text-sm font-black text-indigo-600">
                        ₹{order.total?.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Customer Logistics Meta */}
                  <div className="space-y-3 bg-slate-50/50 border border-slate-200/30 p-4 rounded-xl">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-slate-100 pb-1 flex items-center gap-1">
                      <FiUser /> Logistics Metadata
                    </h3>
                    <div className="space-y-1.5 text-xs text-gray-600 font-medium">
                      <p className="truncate">
                        <span className="text-gray-400 inline-block w-16">
                          Client:
                        </span>{" "}
                        <span className="text-gray-900 font-semibold">
                          {order?.user?.name}
                        </span>
                      </p>
                      <p className="truncate">
                        <span className="text-gray-400 inline-block w-16">
                          Email:
                        </span>{" "}
                        <span className="font-mono text-gray-500">
                          {order?.user?.email}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-400 inline-block w-16">
                          Phone:
                        </span>{" "}
                        <span className="font-mono text-gray-700">
                          {order?.user?.phone}
                        </span>
                      </p>
                      <div className="pt-2 border-t border-dashed border-gray-200/60 mt-2 flex gap-1.5 items-start">
                        <FiMapPin
                          className="text-gray-400 mt-0.5 shrink-0"
                          size={13}
                        />
                        <p className="leading-relaxed text-[11px] text-gray-500">
                          {order?.address?.address}, {order?.address?.state},{" "}
                          <span className="font-mono font-bold text-gray-400">
                            {order?.address?.pincode}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Fallback Container Empty Grid */
            <div className="text-center py-16 bg-slate-50 border border-dashed border-gray-200 rounded-2xl shadow-sm">
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full text-3xl shadow-xs">
                  <FiBox />
                </div>
                <p className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                  No active logs detected
                </p>
                <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                  Looks like there are no orders to display inside this
                  timeframe configuration.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
