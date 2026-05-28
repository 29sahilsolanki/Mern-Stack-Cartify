const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    sender: {
      type: String,
      enum: ["Customer", "Admin"],
      default: "Customer",
    },
    message: { type: String, required: true },
    reply: { type: String, required: true },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
  },
  { timestamps: true },
);

const SupportModel = mongoose.model("Support", Schema);
module.exports = { SupportModel };
