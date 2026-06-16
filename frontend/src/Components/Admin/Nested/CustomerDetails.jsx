import { toast } from "react-toastify";
import { useAdmin } from "../../../Context/AdminContext";
import {
  FaEnvelope,
  FaPhone,
  FaUserShield,
  FaCalendarAlt,
  FaTrash,
  FaShoppingCart,
} from "react-icons/fa";

export default function CustomerDetails() {
  const { customerDetails, deleteUserAndDetails } = useAdmin();

  const handleDeleteCustomer = async (id) => {
    const confirmDelete = window.confirm(`Delete customer ${id}?`);
    if (confirmDelete) {
      await deleteUserAndDetails(id);
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-red-50 text-red-700 border-red-200";
    }
  };

  return (
    <div className=" text-gray-900 min-h-screen p-4 pt-24 pb-12 sm:p-8 font-sans antialiased flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-8">
        {/* 1. Customer Profile Section */}
        <div className="w-full bg-white border border-gray-200/80 rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 sm:gap-8">
          {/* Left: Profile Meta */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left">
            <img
              src={customerDetails?.profilePic}
              alt={customerDetails?.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-md ring-4 ring-indigo-50 object-cover"
            />
            <div className="flex flex-col gap-2 text-gray-600 font-medium">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 block -mb-1">
                Verified Profile Module
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                {customerDetails?.name}
              </h1>

              <div className="space-y-1.5 pt-1 text-sm">
                <p className="flex items-center justify-center sm:justify-start gap-2">
                  <FaEnvelope className="text-indigo-500 text-xs" />{" "}
                  <span className="font-mono text-xs text-gray-700">
                    {customerDetails?.email}
                  </span>
                </p>
                <p className="flex items-center justify-center sm:justify-start gap-2">
                  <FaPhone className="text-gray-400 text-xs" />{" "}
                  <span className="font-mono text-xs text-gray-700">
                    {customerDetails?.phone}
                  </span>
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <FaUserShield className="text-gray-400 text-xs" />{" "}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {customerDetails?.role}
                  </span>
                </div>
                <p className="flex items-center justify-center sm:justify-start gap-2 text-xs text-gray-400 border-t border-dashed border-gray-200 pt-2 mt-1 font-mono">
                  <FaCalendarAlt className="text-gray-400 text-xs" />{" "}
                  {new Date(customerDetails?.createdAt).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Delete Action Trigger */}
          <button
            type="button"
            onClick={() => handleDeleteCustomer(customerDetails?._id)}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-red-50 hover:bg-red-100 border border-red-100 hover:border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer"
          >
            <FaTrash className="text-xs" />
            <span>Delete User</span>
          </button>
        </div>

        {/* 2. Orders Section */}
        <div className="w-full bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-8 shadow-sm">
          <div className="flex items-center justify-center sm:justify-start gap-2 pb-4 border-b border-gray-100 mb-6">
            <FaShoppingCart className="text-indigo-600 text-sm" />
            <h2 className="text-base font-bold text-gray-900 tracking-tight">
              Customer Orders Logs
            </h2>
          </div>

          {customerDetails?.order && customerDetails?.order.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {customerDetails?.order.map((p) => (
                <div
                  key={p._id}
                  className="bg-slate-50/60 border border-slate-200/40 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-xs transition-all hover:bg-white hover:border-indigo-200 hover:shadow-md"
                >
                  {/* Order Card Header */}
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200/40 mb-3">
                    <span className="text-xs font-bold text-gray-400 flex items-center gap-1 font-mono">
                      <FaCalendarAlt className="text-gray-400 text-[10px]" />{" "}
                      {new Date(p.createdAt).toLocaleDateString("en-IN")}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusClasses(
                        p.status,
                      )}`}
                    >
                      {p.status}
                    </span>
                  </div>

                  {/* Order Metadata Info */}
                  <div className="space-y-1 text-xs text-gray-600 font-medium">
                    <div>
                      <span className="text-gray-400 uppercase tracking-wider text-[10px] block mb-0.5">
                        Order Reference Node
                      </span>{" "}
                      <span className="font-mono text-gray-800 font-semibold truncate block">
                        {p._id}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-dashed border-gray-200/60 mt-2 flex justify-between items-center">
                      <span className="text-gray-400 uppercase tracking-wider text-[10px]">
                        Net Value
                      </span>{" "}
                      <span className="text-sm font-extrabold text-indigo-600">
                        ₹{p.total?.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 border border-dashed border-gray-200 rounded-xl">
              <p className="text-gray-400 text-sm font-medium">
                No historical transaction entry flags verified for this node.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
