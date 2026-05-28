import { toast } from "react-toastify";
import { useAdmin } from "../../../Context/AdminContext";
import {
  FaEnvelope,
  FaPhone,
  FaUserShield,
  FaCalendarAlt,
  FaTrash,
} from "react-icons/fa";

export default function CustomerDetails() {
  const { customerDetails, deleteUserAndDetails } = useAdmin();

  const handleDeleteCustomer = async (id) => {
    const confirmDelete = window.confirm(`Delete customer ${id}?`);
    if (confirmDelete) {
      await deleteUserAndDetails(id);
    }
  };

  return (
    <div className="flex-1 pt-6 sm:pt-10 p-4 sm:p-6 min-h-screen">
      {/* Customer Profile Section */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 rounded-xl shadow-lg p-6 sm:p-8 border border-slate-700 hover:border-indigo-500 transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-6 sm:gap-8">
          {/* Left: Profile */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left">
            <img
              src={customerDetails?.profilePic}
              alt={customerDetails?.name}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-indigo-500 shadow-md object-cover"
            />
            <div className="flex flex-col gap-2 sm:gap-3 text-gray-300">
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {customerDetails?.name}
              </h1>
              <p className="flex items-center gap-2 text-sm sm:text-base">
                <FaEnvelope className="text-indigo-400" />{" "}
                {customerDetails?.email}
              </p>
              <p className="flex items-center gap-2 text-sm sm:text-base">
                <FaPhone className="text-indigo-400" /> {customerDetails?.phone}
              </p>
              <p className="flex items-center gap-2 text-sm sm:text-base">
                <FaUserShield className="text-indigo-400" />{" "}
                {customerDetails?.role}
              </p>
              <p className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                <FaCalendarAlt className="text-red-400" />{" "}
                {new Date(customerDetails?.createdAt).toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Right: Delete Button */}
          <button
            onClick={() => handleDeleteCustomer(customerDetails?._id)}
            className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 transition text-sm sm:text-base"
          >
            <FaTrash />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Orders Section */}
      <div className="mt-8 sm:mt-12 flex justify-center">
        <div className="w-full max-w-4xl bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 rounded-xl shadow-lg p-6 sm:p-8 border border-slate-700 hover:border-indigo-500 transition-all">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center">
            Customer Orders
          </h1>
          {customerDetails?.order && customerDetails?.order.length > 0 ? (
            <div className="flex flex-col gap-4 sm:gap-6">
              {customerDetails?.order.map((p) => (
                <div
                  key={p._id}
                  className="bg-slate-900 rounded-lg shadow-md p-4 sm:p-6 border border-slate-700 hover:border-indigo-500 hover:shadow-xl transition-all flex flex-col gap-3 sm:gap-4"
                >
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <span className="text-xs sm:text-sm text-gray-400">
                      {new Date(p.createdAt).toLocaleDateString("en-IN")}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        p.status === "Delivered"
                          ? "bg-green-600 text-white"
                          : p.status === "Pending"
                            ? "bg-yellow-500 text-black"
                            : "bg-red-600 text-white"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  {/* Order Info */}
                  <div className="flex flex-col gap-1 sm:gap-2 text-gray-300 text-sm sm:text-base">
                    <p>
                      <span className="text-gray-400">Order Id:</span>{" "}
                      <span className="text-indigo-400">{p._id}</span>
                    </p>
                    <p>
                      <span className="text-gray-400">Total:</span>{" "}
                      <span className="text-yellow-400 font-semibold">
                        ₹{p.total}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 text-sm sm:text-base">
              No orders found..!!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
