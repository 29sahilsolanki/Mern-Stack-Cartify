import { useEffect } from "react";
import { useAdmin } from "../../../Context/AdminContext";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Customers() {
  const { menu, customers, fetchCustomers, fetchCustomerOrders } = useAdmin();

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-5 mt-5 text-center">
        Happy Customers
      </h1>

      {/* Grid layout for cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {customers.map((p) => (
          <Link
            to="/admin-dashboard/customer-details"
            onClick={() => {
              fetchCustomerOrders(p, p._id);
            }}
            key={p._id}
            className="bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 rounded-xl shadow-lg p-6 border border-slate-700 hover:shadow-2xl hover:border-indigo-500 transition-all"
          >
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <img
                src={p.profilePic}
                alt="profile"
                className="w-24 h-24 rounded-full border-2 border-indigo-500 object-cover shadow-md"
              />
            </div>

            {/* Info */}
            <div className="space-y-3 text-white">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-400">Name:</span>
                <span className="text-sm capitalize">{p.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-400">
                  Email:
                </span>
                <span className="text-sm">{p.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-400">
                  Phone:
                </span>
                <span className="text-sm">{p.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-400">
                  Access Type:
                </span>
                <span className="text-sm capitalize text-indigo-400 font-semibold">
                  {p.role}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-400">
                  Joined On:
                </span>
                <span className="text-sm text-indigo-400 font-semibold">
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
  );
}
