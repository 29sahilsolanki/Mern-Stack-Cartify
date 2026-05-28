const { OrderModel } = require("../Models/OrderModel");
const { SupportModel } = require("../Models/SupportModel");
const { UserModel } = require("../Models/UserModel");

const raiseSupportTicket = async (req, res) => {
  try {
    const { id } = req.user;
    const { orderId, sender, message, reply } = req.body;

    const order = await OrderModel.findOne({ user: id, _id: orderId });
    if (!order) {
      return res
        .status(404)
        .json({ status: false, message: "Order id doesn't exist..!!" });
    }

    const existing = await SupportModel.findOne({
      user: id,
      order: orderId,
      status: { $ne: "Closed" },
    });
    if (existing) {
      return res.status(409).json({
        status: false,
        message: "We are already working on this ticket..!!",
      });
    }
    const supportRes = new SupportModel({
      user: id,
      order: orderId,
      message,
      reply,
    });
    const supportTicket = await supportRes.save();
    return res.status(200).json({
      status: true,
      message: "Support ticket has been raised..!!",
      supportRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Couldn't raise your support ticket..!!",
      error: error.message,
    });
  }
};

//--------------------fetch support ticket-----------------------//
const fetchSupportTicket = async (req, res) => {
  try {
    const { id } = req.user;
    const supportRes = await SupportModel.find({ user: id });
    if (!supportRes) {
      return res
        .status(404)
        .json({ status: false, message: "No support ticket found..!!" });
    }
    return res.status(200).json({
      status: true,
      message: "Support tickets detail..!!",
      supportRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to fetch support tickets..!!",
      error: error.message,
    });
  }
};

const updateSupportTicketCus = async (req, res) => {
  try {
    const { orderId, status, message } = req.body;
    const updateRes = await SupportModel.findOneAndUpdate(
      { order: orderId },
      {
        $set: { status, message },
      },
      { returnDocument: "after" },
    );
    if (!updateRes) {
      return res.status(403).json({
        status: false,
        message: "couldn't update support ticket status..!!",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Support ticket status has been updated..!!",
      updateRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to update support ticket status..!!",
      error: error.message,
    });
  }
};

//----------------------admin section-----------------------//
const fetchTicketDate = async (req, res) => {
  try {
    const { ticketDate } = req.params;

    const start = new Date(ticketDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(ticketDate);
    end.setHours(23, 59, 59, 999);

    // const ticketRes = await SupportModel.find({
    //   communication: { $elemMatch: { createdAt: { $gte: start, $lte: end } } },
    // });

    const ticketRes = await SupportModel.find({
      createdAt: { $gte: start, $lte: end },
    }).populate("user");

    if (!ticketRes || ticketRes.length === 0) {
      return res.status(404).json({
        status: false,
        message: `No support ticket found for date: ${ticketDate}`,
      });
    }
    return res.status(200).json({
      status: true,
      message: `Support ticket found for date: ${ticketDate}`,
      ticketRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to find support ticket..!!",
      error: error.message,
    });
  }
};

const adminTicketReply = async (req, res) => {
  try {
    const { supportId, adminReply } = req.body;
    const { reply, status } = adminReply;
    const replyRes = await SupportModel.findByIdAndUpdate(
      supportId,
      { $set: { reply, status } },
      { new: true },
    );
    if (!replyRes) {
      return res.status(404).json({
        status: false,
        message: "Couldn't update support ticket..!!",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Support ticket status has been updated..!!",
      replyRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to update support ticket..!!",
      error: error.message,
    });
  }
};

module.exports = {
  raiseSupportTicket,
  fetchSupportTicket,
  updateSupportTicketCus,
  fetchTicketDate,
  adminTicketReply,
};
