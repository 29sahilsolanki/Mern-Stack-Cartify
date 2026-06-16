import { useNavigate } from "react-router-dom";
import { useCutomer } from "../../../Context/CustomerContext";
import { FiBox, FiAlertTriangle, FiShoppingBag } from "react-icons/fi";

export default function Orders() {
  const { order, cancelCustomerOrder } = useCutomer();
  const navigate = useNavigate();

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
    <div className=" text-gray-900 min-h-screen p-2 mt-10 sm:p-6 mb-15 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header Panel */}
        <div className="w-full bg-slate-50 border border-gray-200/60 px-6 py-5 rounded-2xl shadow-sm flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl text-xl">
            <FiBox />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
              My Orders
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Track and audit your structural purchase history
            </p>
          </div>
        </div>

        {/* Orders Feed Main Container */}
        <div className="flex flex-col gap-5">
          {order && order.length > 0 ? (
            [...order]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((p) => (
                <div
                  key={p._id}
                  className={`bg-white border rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 ${
                    p.status === "Cancelled"
                      ? "opacity-55 bg-slate-50/50 border-gray-200 pointer-events-none"
                      : "border-gray-200/80 shadow-sm hover:shadow-xl hover:border-indigo-200"
                  }`}
                >
                  {/* Order Meta Header Block */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-3 border-b border-gray-100 mb-4 gap-2 sm:gap-0">
                    <p className="text-indigo-600 font-bold font-mono text-xs sm:text-sm">
                      Order ID:{" "}
                      <span className="text-gray-500 font-normal">{p._id}</span>
                    </p>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusClasses(
                        p.status,
                      )}`}
                    >
                      {p.status}
                    </span>
                  </div>

                  {/* Sub-Products Iteration Array */}
                  <div className="flex flex-col gap-3 mb-4">
                    {p?.items?.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center bg-slate-50/60 border border-slate-100 rounded-xl p-3"
                      >
                        {/* Sub-Product Thumbnails */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white border border-gray-100 rounded-lg p-1.5 overflow-hidden flex items-center justify-center shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="max-h-full max-w-full object-contain mix-blend-multiply"
                          />
                        </div>

                        {/* Sub-Product Metadata Specs */}
                        <div className="flex-1 pl-4 min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {item.product.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Quantity:{" "}
                            <span className="font-semibold text-gray-700">
                              {item.quantity}
                            </span>
                            <span className="mx-2 text-gray-300">|</span>
                            Price:{" "}
                            <span className="font-semibold text-gray-700">
                              ₹{item.price.toLocaleString("en-IN")}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Financial Summary Logs + Action Handlers */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-t border-gray-50 pt-4 gap-4 sm:gap-0">
                    {/* Price Summary Grid Left */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500 font-medium">
                      <span>Subtotal:</span>
                      <span className="text-gray-900 text-right">
                        ₹{p.subtotal?.toLocaleString("en-IN")}
                      </span>
                      <span>Shipping Fees:</span>
                      <span className="text-gray-900 text-right">
                        ₹{p.shipping}
                      </span>
                      <span>Bespoke Discount:</span>
                      <span className="text-emerald-600 text-right">
                        - ₹{p.discount}
                      </span>
                      <span className="font-bold text-indigo-600 border-t border-dashed border-gray-200 pt-1 mt-1">
                        Total Paid:
                      </span>
                      <span className="font-extrabold text-indigo-600 text-sm border-t border-dashed border-gray-200 pt-1 mt-1 text-right">
                        ₹{p.total?.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Explicit Cancellation Action Handlers Right */}
                    {!(
                      p?.status === "Cancelled" || p.status === "Delivered"
                    ) && (
                      <div className="w-full sm:w-auto">
                        {p?.status !== "Pending" ? (
                          <button
                            type="button"
                            className="w-full sm:w-auto bg-white hover:bg-slate-50 border border-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                            onClick={() =>
                              navigate("/customer-dashboard/support")
                            }
                          >
                            <FiAlertTriangle className="text-amber-500" />{" "}
                            Request Cancellation
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="w-full sm:w-auto bg-red-50 hover:bg-red-100 border border-red-100 hover:border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
                            onClick={() =>
                              cancelCustomerOrder(p._id, "Cancelled")
                            }
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center py-20 bg-white border border-dashed border-gray-200 rounded-2xl shadow-sm">
              <p className="text-gray-400 text-sm font-medium">
                No order structures registered in your account logs.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
