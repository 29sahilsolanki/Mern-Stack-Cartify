const { CartModel } = require("../Models/CartModel");
const { OrderModel } = require("../Models/OrderModel");
const { ProductsModel } = require("../Models/ProductModel");

const placeOrder = async (req, res) => {
  try {
    const { id } = req.user;
    const { buyProduct, cart, address } = req.body;
    let orderItems = [];
    if (buyProduct) {
      orderItems.push({
        product: buyProduct._id,
        quantity: buyProduct.quantity,
        price: buyProduct.price,
      });
    }
    if (cart && Array.isArray(cart) && cart?.length > 0) {
      orderItems = cart.map((p) => ({
        product: p.product._id,
        quantity: p.quantity,
        price: p.product.price,
      }));
    }

    const subtotal = orderItems.reduce(
      (sum, p) => sum + p.quantity * p.price,
      0,
    );
    const shipping = 500;
    const discount = 49;
    const total = subtotal + shipping - discount;

    const orderRes = new OrderModel({
      user: id,
      items: orderItems,
      address,
      subtotal,
      shipping,
      discount,
      total,
    });
    if (!orderRes) {
      return res.status(403).json({
        status: false,
        message: "Couldn't place order at the moment..!!",
      });
    }

    const placedOrder = await orderRes.save();

    if (!placedOrder) {
      return res
        .status(403)
        .json({ status: false, message: "Couldn't place your order..!!" });
    }

    if (cart && cart.length > 0) {
      const orderedProductIds = cart.map((i) => i.product._id);
      console.log(orderedProductIds);
      const clearCart = await CartModel.updateOne(
        { user: id },
        { $pull: { items: { product: { $in: orderedProductIds } } } },
      );
    }

    if (orderItems && orderItems.length > 0) {
      const reduceStock = await Promise.all(
        orderItems.map((item) =>
          ProductsModel.findByIdAndUpdate(item.product, {
            $inc: { stock: -item.quantity },
          }),
        ),
      );
    }

    return res.status(200).json({
      status: true,
      message: "Order has been placed successfully..!!",
      placedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to place your order..!!",
      error: error.message,
    });
  }
};

//---------------fetch order---------------//
const fetchCustomerOrder = async (req, res) => {
  try {
    let id;
    if (req.user.role === "customer") {
      id = req.user.id;
    } else if (req.user.role === "admin" && req.query?.id) {
      id = req.query.id;
    }
    const orderRes = await OrderModel.find({ user: id }).populate(
      "items.product",
      "image title",
    );
    if (!orderRes || orderRes.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "No orders found..!!" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Order details found..!!", orderRes });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to fetch order details..!!",
      error: error.message,
    });
  }
};

const cancelCustomerOrder = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const findOrder = await OrderModel.findById(orderId);
    if (!orderId) {
      return res
        .status(404)
        .json({ status: false, message: "No order found to cancel..!!" });
    }

    const orderStatus = findOrder.status === "Pending";

    if (!orderStatus) {
      return res.status(403).json({
        status: false,
        message: `Your order status is ${findOrder.status} can't cancel..!!`,
      });
    }

    const cancelRes = await OrderModel.findByIdAndUpdate(
      orderId,
      { $set: { status } },
      { returnDocument: "after" },
    );
    return res.status(200).json({
      status: true,
      message: "Your order has been marked cancelled..!!",
      cancelRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to cancel your order..!!",
      error: error.message,
    });
  }
};

//----------------------Admin section--------------------//
const fetchAllOrders = async (req, res) => {
  try {
    const orderRes = await OrderModel.find()
      .populate("user", "name email phone")
      .populate("items.product", "image title");
    if (!orderRes || orderRes.length <= 0) {
      return res
        .status(404)
        .json({ status: false, message: "No orders found..!!" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Orders detail found..!!", orderRes });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to find orders..!!",
      error: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const updateRes = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { returnDocument: "after" },
    );
    if (!updateRes) {
      return res
        .status(404)
        .json({ status: false, message: "Order not found to update..!!" });
    }
    return res.status(200).json({
      status: true,
      message: `Order status has been updated to ${status}`,
      updateRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Couldn't update order status..!!",
      error: error.message,
    });
  }
};

const fetchOrderByDate = async (req, res) => {
  try {
    const { date, orderId } = req.query;

    let fetchRes;
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      fetchRes = await OrderModel.find({
        createdAt: { $gte: start, $lte: end },
      })
        .populate("user")
        .populate({
          path: "items",
          populate: {
            path: "product",
          },
        });
    } else if (orderId) {
      fetchRes = await OrderModel.find({ _id: orderId })
        .populate("user")
        .populate({
          path: "items",
          populate: {
            path: "product",
          },
        });
    }

    if (!fetchRes || fetchRes.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "No orders found..!!" });
    }
    return res.status(200).json({
      status: true,
      message: "Order details found..!!",
      fetchRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to find orders..!!",
      error: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  fetchCustomerOrder,
  fetchAllOrders,
  updateOrderStatus,
  fetchOrderByDate,
  cancelCustomerOrder,
};
