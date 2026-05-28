import React, { useEffect, useState } from "react";
import { useSupport } from "../../../Context/SupportContext";

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

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-white">Support</h1>

        {/* Support Form with new ticket and update ticket*/}
        {reopen ? (
          <form
            onSubmit={handleUpdate}
            className="bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 p-6 rounded-lg shadow-lg space-y-4"
          >
            <div>
              <label className="block mb-1 text-white">Order ID</label>
              <input
                type="text"
                value={supportInput.orderId}
                onChange={(e) =>
                  setSupportInput({ ...supportInput, orderId: e.target.value })
                }
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-white">Message</label>
              <textarea
                value={supportInput.message}
                onChange={(e) =>
                  setSupportInput({ ...supportInput, message: e.target.value })
                }
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-600"
                rows="3"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 py-2 rounded-md hover:bg-green-700 transition"
            >
              Re-open Ticket
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 p-6 rounded-lg shadow-lg space-y-4"
          >
            <div>
              <label className="block mb-1 text-white">Order ID</label>
              <input
                type="text"
                value={supportInput.orderId}
                onChange={(e) =>
                  setSupportInput({ ...supportInput, orderId: e.target.value })
                }
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-white">Message</label>
              <textarea
                value={supportInput.message}
                onChange={(e) =>
                  setSupportInput({ ...supportInput, message: e.target.value })
                }
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-600"
                rows="3"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 py-2 rounded-md hover:bg-green-700 transition"
            >
              Submit Request
            </button>
          </form>
        )}
        <div className="bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-white">Support History</h2>

          {!supportTicket || supportTicket.length === 0 ? (
            <p className="text-gray-400">No requests yet.</p>
          ) : (
            <ol className="relative border-l border-gray-600">
              {supportTicket.map((ticket) => (
                <li key={ticket._id} className="mb-10 ml-6">
                  {/* Timeline dot */}
                  <span
                    className={`absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full ring-4 ring-gray-800 ${
                      ticket.status === "Open"
                        ? "bg-green-600"
                        : ticket.status === "Processing"
                          ? "bg-blue-500"
                          : ticket.status === "Closed"
                            ? "bg-gray-500"
                            : "bg-red-600"
                    }`}
                  ></span>

                  {/* Card content */}
                  <div className="bg-gray-700 p-4 rounded-md shadow-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">
                        {new Date(ticket.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </span>
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-900 text-white">
                        {ticket.status}
                      </span>
                    </div>

                    <p className="text-gray-200">
                      <span className="font-semibold">Order ID:</span>{" "}
                      {ticket.order}
                    </p>
                    <p className="text-gray-200">
                      <span className="font-semibold">Message:</span>{" "}
                      {ticket.message}
                    </p>

                    <p className="text-indigo-400">
                      <span className="font-semibold">Reply:</span>{" "}
                      {ticket.reply}
                    </p>

                    {ticket.status === "Closed" && (
                      <div className="flex justify-end mt-3">
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
                          className="bg-yellow-500 hover:bg-yellow-600 text-black text-xs px-3 py-1 rounded"
                        >
                          Re-Open
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
