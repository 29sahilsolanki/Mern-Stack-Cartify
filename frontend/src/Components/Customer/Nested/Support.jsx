import React, { useEffect, useState } from "react";
import { useSupport } from "../../../Context/SupportContext";
import {
  FiHelpCircle,
  FiFileText,
  FiMessageSquare,
  FiRefreshCw,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

export default function Support() {
  const { supportTicket, raiseSupportTicket, updateSupportTicketCus } =
    useSupport();

  const [supportInput, setSupportInput] = useState({
    orderId: "",
    status: "Open",
    message: "",
    reply: "Update expected shortly...",
  });

  function handleSubmit(e) {
    e.preventDefault();
    raiseSupportTicket(supportInput);
    setSupportInput({
      orderId: "",
      message: "",
    });
  }

  const [orderId, setOrderId] = useState("");
  const [reopen, setReopen] = useState(false);

  function handleUpdate(e) {
    e.preventDefault();
    updateSupportTicketCus(supportInput);
    setSupportInput({
      orderId: "",
      message: "",
    });
    setReopen(false);
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "Open":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Processing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Closed":
        return "bg-gray-100 text-gray-600 border-gray-200";
      default:
        return "bg-red-50 text-red-700 border-red-200";
    }
  };

  return (
    <div className=" text-gray-900 min-h-screen p-4 mt-5 mb-10 sm:p-8 font-sans antialiased">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Top Header Panel */}
        <div className="w-full bg-slate-50 border border-gray-200/60 px-6 py-5 rounded-2xl shadow-sm flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl text-xl">
            <FiHelpCircle />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
              Customer Support
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Raise or update communication logs for your orders
            </p>
          </div>
        </div>

        {/* Support Form Box */}
        {reopen ? (
          <form
            onSubmit={handleUpdate}
            className="bg-white border border-gray-200/80 p-6 rounded-2xl shadow-sm space-y-5"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <FiRefreshCw className="text-amber-500 animate-spin" />
              <h2 className="text-base font-bold text-gray-900 tracking-tight">
                Re-open Support Ticket
              </h2>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Order ID
              </label>
              <input
                type="text"
                value={supportInput.orderId}
                onChange={(e) =>
                  setSupportInput({ ...supportInput, orderId: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm font-medium text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Message
              </label>
              <textarea
                value={supportInput.message}
                onChange={(e) =>
                  setSupportInput({ ...supportInput, message: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm font-medium text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                rows="3"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-md shadow-indigo-600/10 transition-all active:scale-98 cursor-pointer"
            >
              Re-open Ticket
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200/80 p-6 rounded-2xl shadow-sm space-y-5"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <FiFileText className="text-indigo-600" />
              <h2 className="text-base font-bold text-gray-900 tracking-tight">
                Raise New Support Ticket
              </h2>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Order ID
              </label>
              <input
                type="text"
                value={supportInput.orderId}
                onChange={(e) =>
                  setSupportInput({ ...supportInput, orderId: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm font-medium text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Message
              </label>
              <textarea
                value={supportInput.message}
                onChange={(e) =>
                  setSupportInput({ ...supportInput, message: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm font-medium text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                rows="3"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-md shadow-indigo-600/10 transition-all active:scale-98 cursor-pointer"
            >
              Submit Request Ticket
            </button>
          </form>
        )}

        {/* Support History Logs */}
        <div className="bg-white border border-slate-200/60 p-5 sm:p-6 rounded-2xl shadow-sm space-y-6">
          <h2 className="text-base font-bold text-gray-900 tracking-tight pb-2 border-b border-gray-200/60">
            Communication Logs History
          </h2>

          {!supportTicket || supportTicket.length === 0 ? (
            <div className="text-center py-8 bg-white border border-dashed border-gray-200 rounded-xl">
              <p className="text-gray-400 text-sm">
                No historical ticket records.
              </p>
            </div>
          ) : (
            <ol className="relative border-l border-slate-200 ml-3 space-y-8">
              {supportTicket.map((ticket) => (
                <li key={ticket._id} className="ml-6 relative">
                  {/* Timeline Static Custom Dot */}
                  <span
                    className={`absolute -left-9 flex items-center justify-center w-6 h-6 rounded-full ring-4 ring-white shadow-xs text-[10px] text-white ${
                      ticket.status === "Open"
                        ? "bg-emerald-500"
                        : ticket.status === "Processing"
                          ? "bg-blue-500"
                          : ticket.status === "Closed"
                            ? "bg-gray-400"
                            : "bg-red-500"
                    }`}
                  >
                    {ticket.status === "Open" ? (
                      <FiAlertCircle size={12} />
                    ) : ticket.status === "Processing" ? (
                      <FiClock size={12} />
                    ) : (
                      <FiCheckCircle size={12} />
                    )}
                  </span>

                  {/* Card Main Body */}
                  <div className="bg-gray-100 border border-gray-100 p-4 sm:p-5 rounded-xl shadow-xs space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                      <span className="text-xs font-semibold text-gray-400 font-mono">
                        {new Date(ticket.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusStyle(ticket.status)}`}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    <div className="text-sm space-y-1 text-gray-600">
                      <p>
                        <span className="font-bold text-gray-800 text-xs uppercase tracking-wider mr-1">
                          Order ID:
                        </span>
                        <span className="font-mono text-gray-500">
                          {ticket.order}
                        </span>
                      </p>
                      <p className="font-light">
                        <span className="font-bold text-gray-800 text-xs uppercase tracking-wider mr-1">
                          Message:
                        </span>
                        {ticket.message}
                      </p>
                    </div>

                    {/* Support Desk Agent Reply Block */}
                    <div className="bg-white border border-indigo-50/60 rounded-lg p-3 flex items-start gap-2.5 mt-2">
                      <FiMessageSquare
                        className="text-indigo-500 mt-0.5 shrink-0"
                        size={14}
                      />
                      <p className="text-xs text-gray-600 leading-relaxed">
                        <span className="font-bold text-indigo-700 block mb-0.5">
                          Admin Response:
                        </span>
                        {ticket.reply}
                      </p>
                    </div>

                    {/* Reopen Action Triggers */}
                    {ticket.status === "Closed" && (
                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setReopen(true);
                            setSupportInput({
                              orderId: ticket.order,
                              status: "Open",
                              message: "",
                              reply: "",
                            });
                          }}
                          className="bg-white hover:bg-slate-50 border border-gray-200 text-gray-700 text-xs font-bold py-1.5 px-3 rounded-lg shadow-xs transition-all active:scale-95 cursor-pointer"
                        >
                          Re-Open Ticket
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
