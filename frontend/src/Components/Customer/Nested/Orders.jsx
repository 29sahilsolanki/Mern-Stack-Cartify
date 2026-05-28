import { useNavigate } from "react-router-dom";
import { useCutomer } from "../../../Context/CustomerContext";

export default function Orders() {
  const { order, cancelCustomerOrder } = useCutomer();
  const navigate = useNavigate();

  const getStatusClasses = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-600 text-black";
      case "Processing":
        return "bg-blue-600 text-white";
      case "Shipped":
        return "bg-purple-600 text-white";
      case "Delivered":
        return "bg-green-600 text-white";
      case "Cancelled":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  return (
    <div className="px-2 sm:px-4 py-4">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-4">
        My Orders
      </h1>
      <div className="flex flex-col gap-3 sm:gap-4">
        {order && order.length > 0 ? (
          order.map((p) => (
            <div
              key={p._id}
              className={`bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 rounded-md shadow-md p-3 sm:p-4 text-white ${
                p.status === "Cancelled" ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 sm:mb-3">
                <p className="text-indigo-400 font-semibold text-xs sm:text-sm">
                  Order ID: {p._id}
                </p>
                <span
                  className={`mt-1 sm:mt-0 px-2 py-0.5 rounded-md text-xs sm:text-sm font-semibold ${getStatusClasses(
                    p.status,
                  )}`}
                >
                  {p.status}
                </span>
              </div>

              {/* Products inside this order */}
              <div className="flex flex-col gap-2 mb-3">
                {p?.items?.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center bg-slate-700 rounded-md p-2"
                  >
                    {/* Product Image */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-full h-full object-contain rounded"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 pl-2 sm:pl-3">
                      <p className="text-sm sm:text-md font-semibold truncate whitespace-nowrap overflow-hidden max-w-[150px] sm:max-w-[250px]">
                        {item.product.title}
                      </p>

                      <p className="text-xs sm:text-sm text-gray-300">
                        Qty: {item.quantity} | ₹{" "}
                        {item.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary + Action */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 gap-2 sm:gap-0">
                {/* Summary Left */}
                <div className="flex flex-col gap-0.5 text-xs sm:text-sm text-gray-300">
                  <p>Subtotal: ₹{p.subtotal}</p>
                  <p>Shipping: ₹{p.shipping}</p>
                  <p>Discount: ₹{p.discount}</p>
                  <p className="font-bold text-indigo-400">Total: ₹{p.total}</p>
                </div>

                {/* Button Right */}
                {!(p?.status === "Cancelled" || p.status === "Delivered") && (
                  <>
                    {p?.status !== "Pending" ? (
                      <button
                        type="button"
                        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm px-3 py-1 rounded"
                        onClick={() => navigate("/customer-dashboard/support")}
                      >
                        Request Cancellation
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm px-3 py-1 rounded"
                        onClick={() => cancelCustomerOrder(p._id, "Cancelled")}
                      >
                        Cancel Order
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No order found..</p>
        )}
      </div>
    </div>
  );
}
