import { useCutomer } from "../../../Context/CustomerContext";
import { FaUserEdit } from "react-icons/fa";
import { MdAddIcCall } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaMapPin } from "react-icons/fa6";
import { useState } from "react";
import EditProfile from "./EditProfile";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen text-white p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {edit ? (
          <EditProfile edit={edit} setEdit={setEdit} customer={customer} />
        ) : (
          <div
            className="bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 
                          p-6 rounded-lg shadow-lg flex flex-col md:flex-row 
                          items-center md:items-start md:justify-between gap-6 md:gap-10"
          >
            {/* Profile Picture */}
            <img
              src={customer.profilePic}
              alt={customer.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover 
                         border-4 border-indigo-600 mb-4 md:mb-0"
            />

            {/* Customer Info */}
            <div className="space-y-3 flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold">{customer.name}</h1>

              <div className="flex items-center gap-2 text-gray-300 justify-center md:justify-start">
                <IoIosMail className="text-lg text-indigo-400" />
                <span>{customer.email}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-300 justify-center md:justify-start">
                <MdAddIcCall className="text-lg text-green-400" />
                <span>{customer.phone}</span>
              </div>

              <div className="flex items-center gap-2 text-indigo-400 font-semibold justify-center md:justify-start">
                <FaUser className="text-lg" />
                <span>{customer.role}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-400 text-sm justify-center md:justify-start">
                <FaMapPin className="text-lg text-red-400" />
                <span>
                  Joined: {new Date(customer.createdAt).toLocaleString("en-GB")}
                </span>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="mt-4 md:mt-0 w-full md:w-auto">
              <button
                type="button"
                className="w-full md:w-auto flex items-center justify-center gap-2 
                           px-5 py-2 bg-indigo-600 text-white font-semibold rounded-md 
                           shadow-md hover:bg-indigo-700 transition"
                onClick={() => setEdit(true)}
              >
                <FaUserEdit className="text-lg" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        )}

        {/* Flex layout for Addresses + Orders */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Saved Addresses */}
          <div
            className="flex-1 w-full bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 
                          p-4 sm:p-6 rounded-lg shadow-lg"
          >
            {newAddress ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Add A New Address</h2>
                  <button
                    type="button"
                    onClick={() => setNewAddress(false)}
                    className="cursor-pointer px-3 py-1 bg-red-600 rounded-md hover:bg-red-700 transition"
                  >
                    Cancel
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1">Address</label>
                    <input
                      type="text"
                      placeholder="Address..."
                      value={address.address}
                      onChange={(e) =>
                        setAddress({ ...address, address: e.target.value })
                      }
                      required
                      className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">State</label>
                    <input
                      type="text"
                      placeholder="State..."
                      value={address.state}
                      onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                      }
                      required
                      className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Pincode</label>
                    <input
                      type="text"
                      placeholder="Pincode..."
                      value={address.pincode}
                      onChange={(e) =>
                        setAddress({ ...address, pincode: e.target.value })
                      }
                      required
                      className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 rounded-md font-semibold hover:bg-indigo-700 transition"
                  >
                    Save Address
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">Your Saved Addresses</h2>
                <ul className="space-y-3">
                  {customer.items && customer.items.length
                    ? customer.items.map((p) => (
                        <li
                          key={p._id}
                          className="bg-gray-700 p-3 rounded-md hover:bg-gray-600 transition flex flex-col"
                        >
                          <div className="flex items-center gap-2">
                            <FaMapPin className="text-red-400" />
                            <span className="text-sm">
                              {p.address}, {p.state}, {p.pincode}
                            </span>
                          </div>
                          <div className="mt-2">
                            <button
                              type="button"
                              onClick={() => deleteAddress(p._id)}
                              className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-md shadow-md hover:bg-red-700 transition"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </li>
                      ))
                    : "No address found. Add new..!!"}
                </ul>
                <button
                  type="button"
                  className="mt-4 w-full md:w-auto flex cursor-pointer items-center justify-center gap-2 px-5 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition"
                  onClick={() => setNewAddress(true)}
                >
                  New Address
                </button>
              </>
            )}
          </div>

          {/* Orders */}
          <div
            className="flex-1 w-full bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 
                          p-4 sm:p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4">Your Orders</h2>
            <ul className="space-y-3">
              {order?.slice(0, 5).map((order) => (
                <li
                  key={order._id}
                  className="bg-gray-700 p-3 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-gray-600 transition"
                >
                  <div>
                    <p className="font-semibold">Order Id: </p>
                    <p className="text-sm text-gray-400">{order._id}</p>
                  </div>
                  <span
                    className={`mt-2 sm:mt-0 px-2 py-0.5 rounded-md text-sm font-semibold ${orderStatus(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </li>
              ))}

              <Link
                to="/customer-dashboard/orders"
                className="inline-block text-indigo-500 font-semibold transform transition duration-200 hover:scale-102 hover:text-indigo-400"
              >
                View more →
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
