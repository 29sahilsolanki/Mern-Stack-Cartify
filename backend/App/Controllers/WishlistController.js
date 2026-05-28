const { WishlistModel } = require("../Models/WishlistModel");

const addToWishlist = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.body;
    const wishlist = await WishlistModel.findOneAndUpdate(
      { user: id },
      { $push: { items: { product: productId } } },
      { upsert: true, returnDocument: "after" },
    );

    return res.status(201).json({
      status: true,
      message: "Product added to your wishlist..!!",
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to add product to wishlist..!!",
      error: error.message,
    });
  }
};

// fetch wishlist
const fetchWishlist = async (req, res) => {
  try {
    const { id } = req.user;
    const wishlistItems = await WishlistModel.findOne({ user: id }).populate({
      path: "items",
      populate: { path: "product" },
    });

    if (!wishlistItems || wishlistItems.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "Your wishlist is empty..!! " });
    }
    return res.status(200).json({
      status: true,
      message: "All products in your wishlist..!!",
      wishlistItems,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to show your wishlist..!!",
      error: error.message,
    });
  }
};

//delete wishlist
const deleteFromWishlist = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.body;
    const wishlistRes = await WishlistModel.updateOne(
      { user: id },
      { $pull: { items: { product: productId } } },
      { returnDocument: "after" },
    );
    if (!wishlistRes) {
      return res.status(403).json({
        status: false,
        message: "Can't remove product from wishlist..!!",
      });
    }
    return res.status(201).json({
      status: true,
      message: "Product removed from wishlist..!!",
      wishlistRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to remove product from wishlist..!!",
      error: error.message,
    });
  }
};

module.exports = { addToWishlist, fetchWishlist, deleteFromWishlist };
