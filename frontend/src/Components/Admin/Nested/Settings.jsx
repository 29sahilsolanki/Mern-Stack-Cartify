import { useState } from "react";
import { useAdmin } from "../../../Context/AdminContext";
import EditProfile from "./EditProfile";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiUserCheck,
  FiEdit,
  FiHelpCircle,
  FiSend,
} from "react-icons/fi";

export default function Settings() {
  const [edit, setEdit] = useState(false);
  const { admin, ticketDate, setTicketDate, ticketInfo, adminTicketReply } =
    useAdmin();

  const [adminReply, setAdminReply] = useState({ reply: "", status: "Closed" });

  function handleReply(supportId, userId) {
    adminTicketReply(supportId, userId, adminReply);
  }

  const getTicketStatusStyle = (status) => {
    switch (status) {
      case "Open":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Processing":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-red-50 text-red-700 border-red-200";
    }
  };

  return (
    <div className=" text-gray-900 min-h-screen p-4 pt-24 pb-12 sm:p-8 font-sans antialiased flex flex-col items-center w-full">
      <div className="max-w-5xl w-full mx-auto space-y-8">
        {/* 1. Admin Profile Card Section */}
        {edit ? (
          <EditProfile edit={edit} setEdit={setEdit} />
        ) : (
          <div className="bg-white border border-gray-200/80 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-10">
            {/* Profile Picture with Ring Accent */}
            <img
              src={admin.profilePic}
              alt={admin.name}
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white shadow-md ring-4 ring-indigo-50 shrink-0"
            />

            {/* Admin Info Metadata */}
            <div className="space-y-3 flex-1 text-center sm:text-left">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 block mb-0.5">
                  Master Console Operations
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight capitalize">
                  {admin.name}
                </h1>
              </div>

              <div className="space-y-1.5 text-sm text-gray-600 font-medium">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <FiMail className="text-indigo-500" size={14} />
                  <span className="font-mono text-xs">{admin.email}</span>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <FiPhone className="text-gray-400" size={14} />
                  <span className="font-mono text-xs">{admin.phone}</span>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
                    <FiUserCheck size={11} /> {admin.role}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-gray-400 border-t border-dashed border-gray-200 pt-2.5 mt-2 font-mono">
                <FiCalendar size={13} />
                <span>
                  Joined Platform:{" "}
                  {new Date(admin.createdAt).toLocaleString("en-GB")}
                </span>
              </div>
            </div>

            {/* Edit Profile Action Trigger */}
            <div className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shadow-indigo-600/10 transition-all active:scale-98"
                onClick={() => setEdit(true)}
              >
                <FiEdit size={13} />
                <span>Modify Profile</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. Support Ticket Section */}
      <div className="mt-8 max-w-5xl w-full">
        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-center sm:justify-start gap-2 pb-4 border-b border-gray-100">
            <FiHelpCircle className="text-indigo-600" />
            <h2 className="text-base font-bold text-gray-900 tracking-tight">
              Support Tickets Control
            </h2>
          </div>

          {/* Date Filter Panel */}
          <div className="w-full bg-slate-50 border border-gray-200/60 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <label className="text-gray-500 font-bold text-xs uppercase tracking-wider">
              Filter By Query Date:
            </label>
            <input
              type="date"
              value={ticketDate}
              onChange={(e) => setTicketDate(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer w-full sm:w-auto"
            />
          </div>

          {/* Tickets List Iterator */}
          {ticketInfo && ticketInfo.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {ticketInfo.map((p) => (
                <div
                  key={p._id}
                  className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200"
                >
                  {/* User Account Info Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-3.5 mb-4 gap-3">
                    <div>
                      <h2 className="text-sm font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
                        <FiUser className="text-gray-400" size={14} />{" "}
                        {p.user.name}
                      </h2>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">
                        {p.user.email} • {p.user.phone}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-gray-600 border border-gray-200">
                      Customer Node
                    </span>
                  </div>

                  {/* Communication Thread Content */}
                  <div className="space-y-4">
                    <div className="bg-slate-50/70 border border-slate-200/40 rounded-xl p-4 sm:p-5 space-y-3.5">
                      {/* Thread Header Meta */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200/40 pb-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getTicketStatusStyle(p.status)}`}
                        >
                          {p.status}
                        </span>
                        <span className="text-gray-400 text-xs font-mono flex items-center gap-1">
                          <FiCalendar size={12} />{" "}
                          {new Date(p.createdAt).toLocaleString("en-GB")}
                        </span>
                      </div>

                      {/* Message History Fields */}
                      <div className="text-xs space-y-2 text-gray-700 leading-relaxed font-medium">
                        <p className="bg-white p-3 rounded-lg border border-slate-100">
                          <span className="font-bold text-gray-400 uppercase tracking-wider text-[10px] block mb-1">
                            User Query Message
                          </span>
                          {p.message}
                        </p>
                        <p className="bg-indigo-50/30 p-3 rounded-lg border border-indigo-100/50 text-indigo-950">
                          <span className="font-bold text-indigo-700 uppercase tracking-wider text-[10px] block mb-1">
                            Admin Response Node
                          </span>
                          {p.reply || (
                            <span className="text-gray-400 font-light italic">
                              No reply dispatched yet...
                            </span>
                          )}
                        </p>
                      </div>

                      {/* Interactive Reply Input Dispatcher Box */}
                      {p.status !== "Closed" && (
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2">
                          <input
                            type="text"
                            placeholder="Enter your operational reply narrative..."
                            value={adminReply.reply}
                            className="flex-1 px-4 py-2.5 rounded-xl bg-white text-sm font-medium text-gray-800 border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder-gray-400"
                            onChange={(e) =>
                              setAdminReply({
                                ...adminReply,
                                reply: e.target.value,
                              })
                            }
                          />
                          <button
                            type="button"
                            onClick={() => handleReply(p._id, p?.user?._id)}
                            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shadow-indigo-600/10 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <FiSend size={12} /> Dispatched
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 border border-dashed border-gray-200 rounded-xl">
              <p className="text-gray-400 text-sm font-medium">
                No verified support ticket logs index registered under this
                timeframe.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
