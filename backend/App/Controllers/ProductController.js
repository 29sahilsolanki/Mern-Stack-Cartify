const { ProductsModel } = require("../Models/ProductModel");

const fs = require("fs");
//cloudinary config
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//uploading products
const uploadProducts = async (req, res) => {
  try {
    const localPath = req.file.path;
    const { title, description, price, stock, category } = req.body;
    const result = await cloudinary.uploader.upload(localPath, {
      folder: "Products",
    });

    const uploadRes = new ProductsModel({
      title,
      description,
      price,
      stock,
      category,
      publicId: result.public_id,
      image: result.secure_url,
    });

    if (!uploadRes) {
      return res
        .status(403)
        .json({ status: false, message: "failed to upload product..!!" });
    }

    const uploaded = await uploadRes.save();

    return res
      .status(201)
      .json({ status: true, message: "product upload successfull", uploaded });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to upload product at the moment",
      error: error.message,
    });
  } finally {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  }
};

//fetch products
const fetchProducts = async (req, res) => {
  try {
    // const fetchRes = await ProductsModel.find().populate("reviews");
    const fetchRes = await ProductsModel.find().populate({
      path: "reviews",
      populate: {
        path: "user",
        select: "name email",
      },
    });

    if (!fetchRes || fetchRes.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No products found in inventory, Add products..!!",
      });
    }
    return res.status(200).json({
      status: true,
      message: "All Products in your inventory",
      fetchRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to fetch products",
      error: error.message,
    });
  }
};

//-------------------update product details-------------------//
const updateProductDetails = async (req, res) => {
  try {
    const localPath = req.file?.path;
    const { productId, title, description, price, stock, category } = req.body;
    const product = await ProductsModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found..!!" });
    }

    let result;
    if (localPath) {
      result = await cloudinary.uploader.upload(localPath, {
        folder: "Products",
      });

      if (product.publicId) {
        await cloudinary.uploader.destroy(product.publicId);
      }
    }

    const updatedProduct = {};
    if (title) updatedProduct.title = title;
    if (description) updatedProduct.description = description;
    if (price) updatedProduct.price = price;
    if (stock) updatedProduct.stock = stock;
    if (category) updatedProduct.category = category;
    if (result) {
      updatedProduct.image = result.secure_url;
      updatedProduct.publicId = result.public_id;
    }

    const updated = await ProductsModel.findByIdAndUpdate(
      productId,
      updatedProduct,
      { returnDocument: "after" },
    );
    return res.status(200).json({
      status: true,
      message: "Product details updated successfully..!!",
      updated,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to update product details..!!",
      error: error.message,
    });
  }
};

// delete product
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await ProductsModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found..!!" });
    }

    if (product.publicId) {
      await cloudinary.uploader.destroy(product.publicId);
    }

    const deleted = await ProductsModel.findByIdAndDelete(productId);

    return res.status(200).json({
      status: true,
      message: "Product deleted successfully..!!",
      deleted,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to delete product..!!",
      error: error.message,
    });
  }
};

module.exports = {
  uploadProducts,
  fetchProducts,
  updateProductDetails,
  deleteProduct,
};
