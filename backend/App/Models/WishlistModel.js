const { required } = require("joi");
const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
});

const WishlistModel = mongoose.model("Wishlist", Schema);
module.exports = { WishlistModel };
