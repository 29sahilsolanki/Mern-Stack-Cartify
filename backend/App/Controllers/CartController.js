const { CartModel } = require("../Models/CartModel");

const addToCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.body;
    const cartRes = await CartModel.findOneAndUpdate(
      { user: id },
      { $push: { items: { product: productId } } },
      { upsert: true, returnDocument: "after" },
    );
    return res.status(201).json({
      status: true,
      message: "Product added to your cart successfully..!!",
      cartRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to add product in your cart..!!",
      error: error.message,
    });
  }
};

//-------------------fetch cart--------------------//
const fetchCartItems = async (req, res) => {
  try {
    const { id } = req.user;
    const cartItems = await CartModel.findOne({ user: id }).populate(
      "items.product",
    );
    if (!cartItems) {
      return res
        .status(400)
        .json({ status: false, message: "Your cart is empty..!!" });
    }
    return res.status(200).json({
      status: true,
      message: "All products in your cart...!!",
      cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to show your cart..!!",
      error: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.body;
    const removeRes = await CartModel.findOneAndUpdate(
      { user: id },
      { $pull: { items: { product: productId } } },
      { returnDocument: "after" },
    );
    return res.status(201).json({
      status: true,
      message: "Product has been removed from cart..!!",
      removeRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to remove product from cart",
      error: error.message,
    });
  }
};

const manageCartQuantity = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId, change } = req.body;

    const cart = await CartModel.findOne({ user: id });
    if (!cart) {
      return res.status(404).json({ status: false, message: "Cart not found" });
    }

    const item = cart.items.find((p) => p.product.toString() === productId);
    if (!item) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found in cart" });
    }

    if (change < 0 && item.quantity <= 1) {
      return res.status(400).json({
        status: false,
        message: "Quantity cannot be less than 1",
      });
    }

    if (change > 0 && item.quantity >= item.product.stock) {
      return res.status(400).json({
        status: false,
        message: "Quantity cannot exceed available stock",
      });
    }

    const quantityRes = await CartModel.findOneAndUpdate(
      { user: id, "items.product": productId },
      { $inc: { "items.$.quantity": change } },
      { returnDocument: "after" },
    );
    if (!quantityRes) {
      return res
        .status(403)
        .json({ status: false, message: "Can't update product quantity..!!" });
    }
    return res.status(201).json({
      status: true,
      message: "Product quantity updated to new..!!",
      quantityRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to update product quantity..!!",
      error: error.message,
    });
  }
};

module.exports = {
  addToCart,
  fetchCartItems,
  removeFromCart,
  manageCartQuantity,
};
