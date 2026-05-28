// razorpay config
const Razorpay = require("razorpay");
const razorpay = new Razorpay({
  key_id: process.env.Test_API_Key,
  key_secret: process.env.TEST_KEY_SECRET,
});
const crypto = require("crypto");
const { SupportModel } = require("../Models/SupportModel");
const createOrder = async (req, res) => {
  try {
    const { buyProduct, cart } = req.body;
    let orderDetails = [];
    if (buyProduct) {
      orderDetails.push({
        product: buyProduct._id,
        quantity: buyProduct.quantity,
        price: buyProduct.price,
      });
    }
    if (cart && Array.isArray(cart) && cart.length > 0) {
      orderDetails = cart.map((p) => {
        product: p.product._id;
        quantity: p.quantity._id;
        price: p.price._id;
      });
    }

    const subtotal = orderDetails.reduce(
      (sum, p) => sum + p.quantity * p.price,
      0,
    );
    const shipping = 500;
    const discount = 49;
    const total = subtotal + shipping - discount;

    // create order by razorpay
    const options = {
      amount: total * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      status: true,
      message: "Order created successfully..!!",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong..!!",
      error: error.message,
    });
  }
};

const verifyPayment = () => {
  const verifyPayment = async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({
          status: false,
          message: "Missing payment verification fields",
        });
      }

      const hmac = crypto.createHmac("sha256", process.env.TEST_KEY_SECRET);
      hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
      const generatedSignature = hmac.digest("hex");

      if (generatedSignature === razorpay_signature) {
        return res
          .status(200)
          .json({ status: true, message: "Payment verified successfully" });
      } else {
        return res
          .status(400)
          .json({ status: false, message: "Invalid signature" });
      }
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Verification failed..!!",
        error: error.message,
      });
    }
  };
};

module.exports = { createOrder, verifyPayment };
