import { FaUserEdit } from "react-icons/fa";
import { MdAddIcCall } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaMapPin } from "react-icons/fa6";
import { useState } from "react";
import EditProfile from "./EditProfile";
import { useAdmin } from "../../../Context/AdminContext";

export default function Settings() {
  const [edit, setEdit] = useState(false);
  const { admin, ticketDate, setTicketDate, ticketInfo, adminTicketReply } =
    useAdmin();

  const [adminReply, setAdminReply] = useState({ reply: "", status: "Closed" });

  function handleReply(supportId, userId) {
    adminTicketReply(supportId, userId, adminReply);
  }

  return (
    <div className="min-h-screen text-white p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {edit ? (
          <EditProfile edit={edit} setEdit={setEdit} />
        ) : (
          <div className="bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 p-6 rounded-lg shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-10">
            {/* Profile Picture */}
            <img
              src={admin.profilePic}
              alt={admin.name}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-indigo-600"
            />

            {/* Admin Info */}
            <div className="space-y-3 flex-1 text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold capitalize">
                {admin.name}
              </h1>

              <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-300 text-sm sm:text-base">
                <IoIosMail className="text-indigo-400" />
                <span>{admin.email}</span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-300 text-sm sm:text-base">
                <MdAddIcCall className="text-green-400" />
                <span>{admin.phone}</span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2 text-indigo-400 font-semibold text-sm sm:text-base">
                <FaUser />
                <span>{admin.role}</span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-400 text-xs sm:text-sm">
                <FaMapPin className="text-red-400" />
                <span>{new Date(admin.createdAt).toLocaleString("en-GB")}</span>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div>
              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 px-4 sm:px-5 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition text-sm sm:text-base"
                onClick={() => setEdit(true)}
              >
                <FaUserEdit />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Support Section */}
      <div className="mt-10 sm:mt-12">
        <div className="bg-gradient-to-b from-slate-800 via-gray-900 to-black rounded-xl shadow-lg p-6 sm:p-8 border border-slate-700">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
            Support Tickets
          </h1>

          {/* Date Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <label className="text-gray-300 font-medium text-sm sm:text-base">
              Select Date:
            </label>
            <input
              type="date"
              value={ticketDate}
              onChange={(e) => setTicketDate(e.target.value)}
              className="px-3 sm:px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
            />
          </div>

          {/* Tickets List */}
          {ticketInfo && ticketInfo.length > 0 ? (
            <div className="space-y-6 sm:space-y-8">
              {ticketInfo.map((p) => (
                <div
                  key={p._id}
                  className="bg-slate-900 rounded-lg shadow-md p-4 sm:p-6 border border-slate-700 hover:border-indigo-500 transition-all"
                >
                  {/* User Info */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-700 pb-4 mb-4 gap-2">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-white">
                        {p.user.name}
                      </h2>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        {p.user.email}
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        {p.user.phone}
                      </p>
                    </div>
                    <span className="px-3 sm:px-4 py-1 bg-indigo-600 text-white rounded-full text-xs sm:text-sm font-semibold">
                      Customer
                    </span>
                  </div>

                  {/* Communication Threads */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-slate-700 rounded-lg p-4 sm:p-5 shadow-md hover:shadow-xl transition flex flex-col gap-3">
                      {/* Status + Date */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            p.status === "Open"
                              ? "bg-green-600 text-white"
                              : p.status === "Processing"
                                ? "bg-yellow-500 text-black"
                                : "bg-red-600 text-white"
                          }`}
                        >
                          {p.status}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {new Date(p.createdAt).toLocaleString("en-GB")}
                        </span>
                      </div>

                      {/* Messages */}
                      <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">
                        Message: {p.message}
                      </p>
                      <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">
                        Admin: {p.reply}
                      </p>

                      {/* Reply Box */}
                      {p.status !== "Closed" && (
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                          <input
                            type="text"
                            placeholder="Enter your reply..."
                            value={adminReply.reply}
                            className="flex-1 px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm"
                            onChange={(e) =>
                              setAdminReply({
                                ...adminReply,
                                reply: e.target.value,
                              })
                            }
                          />
                          <button
                            onClick={() => handleReply(p._id, p?.user?._id)}
                            className="px-6 sm:px-8 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-xs sm:text-sm font-semibold"
                          >
                            Send
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 text-sm sm:text-base">
              No support ticket found..!!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
