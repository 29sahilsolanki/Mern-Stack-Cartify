const { required, ref } = require("joi");
const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category: {
      type: String,
      enum: [
        "fashion",
        "electronics",
        "beauty",
        "home",
        "furniture",
        "sports",
        "jewellery",
        "toys",
      ],
      required: true,
    },
    image: { type: String, required: true },
    publicId: { type: String, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reviews" }],
  },
  { timestamps: true },
);

const ProductsModel = mongoose.model("Product", Schema);
module.exports = { ProductsModel };
