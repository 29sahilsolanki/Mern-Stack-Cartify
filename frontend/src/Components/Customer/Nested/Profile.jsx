import { useCutomer } from "../../../Context/CustomerContext";
import { FaUserEdit } from "react-icons/fa";
import { MdAddIcCall } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaMapPin } from "react-icons/fa6";
import { useState } from "react";
import EditProfile from "./EditProfile";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiAward,
  FiCalendar,
  FiMapPin,
  FiPackage,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";

export default function Profile() {
  const { customer, address, setAddress, updateAddress, deleteAddress, order } =
    useCutomer();
  const [edit, setEdit] = useState(false);
  const [newAddress, setNewAddress] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    updateAddress();
    setNewAddress(false);
  }

  const orderStatus = (status) => {
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
    <div className=" text-gray-900 min-h-screen p-4 mt-10 sm:p-8 font-sans antialiased">
      <div className="max-w-5xl mx-auto space-y-8">
        {edit ? (
          <EditProfile edit={edit} setEdit={setEdit} customer={customer} />
        ) : (
          /* Main User Bio Card */
          <div
            className="bg-slate-50 border border-gray-200/80 p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col md:flex-row 
                       items-center md:items-start md:justify-between gap-6 md:gap-10"
          >
            {/* Profile Picture with Custom Ring Accent */}
            <div className="relative shrink-0">
              <img
                src={customer.profilePic}
                alt={customer.name}
                className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover 
                           border-4 border-white shadow-md ring-4 ring-indigo-50"
              />
            </div>

            {/* Customer Info Metadata Nodes */}
            <div className="space-y-3.5 flex-1 text-center md:text-left py-1">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 block mb-0.5">
                  Customer Profile Details
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                  {customer.name}
                </h1>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <FiMail className="text-indigo-500" />
                  <span>{customer.email}</span>
                </div>

                <div className="flex items-center gap-2">
                  <FiPhone className="text-gray-400" />
                  <span>{customer.phone}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
                  <FiAward size={13} /> {customer.role}
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-white text-gray-400 border border-gray-200 font-mono">
                  <FiCalendar size={13} /> Joined:{" "}
                  {new Date(customer.createdAt).toLocaleDateString("en-GB")}
                </span>
              </div>
            </div>

            {/* Edit Profile Action Box */}
            <div className="mt-2 md:mt-0 w-full md:w-auto">
              <button
                type="button"
                className="w-full md:w-auto flex items-center justify-center gap-2 cursor-pointer
                           px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl 
                           shadow-md shadow-indigo-600/10 transition-all active:scale-98"
                onClick={() => setEdit(true)}
              >
                <FaUserEdit className="text-sm" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        )}

        {/* Layout Split Grid for Addresses + Quick Orders Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Saved Addresses Panel Box */}
          <div className="bg-white border border-gray-200/80 p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            {newAddress ? (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h2 className="text-base font-bold text-gray-900 tracking-tight">
                    Add A New Address
                  </h2>
                  <button
                    type="button"
                    onClick={() => setNewAddress(false)}
                    className="cursor-pointer text-xs font-bold uppercase tracking-wider px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 rounded-lg transition-all"
                  >
                    Cancel X
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Street Address
                    </label>
                    <input
                      type="text"
                      placeholder="Enter structural building address..."
                      value={address.address}
                      onChange={(e) =>
                        setAddress({ ...address, address: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm font-medium text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        State
                      </label>
                      <input
                        type="text"
                        placeholder="State name"
                        value={address.state}
                        onChange={(e) =>
                          setAddress({ ...address, state: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm font-medium text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Pincode
                      </label>
                      <input
                        type="text"
                        placeholder="Postal zip code"
                        value={address.pincode}
                        onChange={(e) =>
                          setAddress({ ...address, pincode: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm font-medium text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shadow-indigo-600/10 transition-all active:scale-98 cursor-pointer"
                  >
                    Save Address Data
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-4 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 pb-3 border-b border-gray-100 mb-4">
                    <FiMapPin className="text-indigo-600" />
                    <h2 className="text-base font-bold text-gray-900 tracking-tight">
                      Saved Address Database
                    </h2>
                  </div>

                  <ul className="space-y-3">
                    {customer.items && customer.items.length ? (
                      customer.items.map((p) => (
                        <li
                          key={p._id}
                          className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl flex items-start justify-between gap-4 transition-all hover:bg-slate-100/50"
                        >
                          <div className="flex gap-2.5 min-w-0">
                            <FiMapPin
                              className="text-gray-400 mt-0.5 shrink-0"
                              size={15}
                            />
                            <span className="text-sm text-gray-600 font-medium leading-relaxed">
                              {p.address}, {p.state},{" "}
                              <span className="font-mono text-gray-400">
                                {p.pincode}
                              </span>
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => deleteAddress(p._id)}
                            className="text-gray-400 hover:text-red-500 border border-transparent hover:border-red-100 p-2 hover:bg-red-50/50 rounded-xl transition-all cursor-pointer shrink-0"
                            title="Delete address record"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </li>
                      ))
                    ) : (
                      <div className="text-center py-6 bg-slate-50 border border-dashed border-gray-200 rounded-xl">
                        <p className="text-gray-400 text-xs">
                          No address indexes verified in this profile.
                        </p>
                      </div>
                    )}
                  </ul>
                </div>

                <button
                  type="button"
                  className="mt-6 w-full inline-flex cursor-pointer items-center justify-center gap-2 px-5 py-3 bg-white border border-indigo-200 hover:border-indigo-600 text-indigo-600 hover:bg-indigo-50/20 text-xs font-bold uppercase tracking-wider rounded-xl transition-all active:scale-98"
                  onClick={() => setNewAddress(true)}
                >
                  <FiPlus /> Add New Address
                </button>
              </div>
            )}
          </div>

          {/* 2. Recent Quick Orders Feed Summary Box */}
          <div className="bg-white border border-gray-200/80 p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100 mb-4">
                <FiPackage className="text-indigo-600" />
                <h2 className="text-base font-bold text-gray-900 tracking-tight">
                  Recent Activity Stream
                </h2>
              </div>

              <ul className="space-y-3">
                {order && order.length > 0 ? (
                  order.slice(0, 4).map((order) => (
                    <li
                      key={order._id}
                      className="bg-slate-50 border border-slate-200/40 p-3.5 rounded-xl flex items-center justify-between hover:bg-slate-100/50 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                          Order Node Identifier
                        </p>
                        <p className="text-xs font-mono font-semibold text-gray-700 truncate max-w-40 sm:max-w-xs">
                          {order._id}
                        </p>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${orderStatus(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </li>
                  ))
                ) : (
                  <div className="text-center py-10 bg-slate-50 border border-dashed border-gray-200 rounded-xl">
                    <p className="text-gray-400 text-xs">
                      No recent transaction entries flagged.
                    </p>
                  </div>
                )}
              </ul>
            </div>

            <div className="pt-6 border-t border-gray-50 mt-4 flex justify-end">
              <Link
                to="/customer-dashboard/orders"
                className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition duration-200 hover:translate-x-0.5"
              >
                View All Orders →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
