import { useEffect } from "react";
import { useAdmin } from "../../../Context/AdminContext";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { FiUsers, FiUser, FiMail, FiPhone, FiCalendar } from "react-icons/fi";

export default function Customers() {
  const { menu, customers, fetchCustomers, fetchCustomerOrders } = useAdmin();

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className=" text-gray-900 min-h-screen p-4 pt-24 pb-12 sm:p-8 font-sans antialiased">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header Panel */}
        <div className="w-full bg-slate-50 border border-gray-200/60 px-6 py-5 rounded-2xl shadow-sm flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl text-xl">
            <FiUsers />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
              User Base Manager
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Audit and explore verified customer profile modules
            </p>
          </div>
        </div>

        {/* Grid layout for premium minimal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers.map((p) => (
            <Link
              to="/admin-dashboard/customer-details"
              onClick={() => {
                fetchCustomerOrders(p, p._id);
              }}
              key={p._id}
              className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Avatar with Ring Accents */}
              <div className="flex justify-center mb-5">
                <img
                  src={p.profilePic}
                  alt="profile"
                  className="w-20 h-24 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-md ring-4 ring-indigo-50 object-cover"
                />
              </div>

              {/* Info Matrix Parameters */}
              <div className="space-y-2.5 border-t border-slate-100 pt-4">
                <div className="flex justify-between items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                    <FiUser size={13} /> Name
                  </span>
                  <span className="text-sm font-bold text-gray-900 capitalize truncate max-w-35">
                    {p.name}
                  </span>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                    <FiMail size={13} /> Email
                  </span>
                  <span className="text-sm font-medium text-gray-600 truncate max-w-40 font-mono">
                    {p.email}
                  </span>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                    <FiPhone size={13} /> Phone
                  </span>
                  <span className="text-sm font-medium text-gray-600 font-mono">
                    {p.phone}
                  </span>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    {" "}
                    Access
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {p.role}
                  </span>
                </div>

                <div className="flex justify-between items-center gap-4 border-t border-dashed border-gray-100 pt-2.5 mt-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                    <FiCalendar size={13} /> Joined On
                  </span>
                  <span className="text-xs font-bold font-mono text-indigo-600">
                    {new Date(p.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
