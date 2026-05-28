const { UserModel } = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { CartModel } = require("../Models/CartModel");
const { WishlistModel } = require("../Models/WishlistModel");
const { ReviewsModel } = require("../Models/ReviewsModel");
const { OrderModel } = require("../Models/OrderModel");
const { SupportModel } = require("../Models/SupportModel");
//cloudinary config
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//----------------Register User-----------------//
const registerUser = async (req, res) => {
  try {
    const localPath = req.file.path;
    const { name, email, phone, role, password } = req.body;
    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.status(409).json({
        status: false,
        message: "User already exist from this email..!!",
      });
    }
    const result = await cloudinary.uploader.upload(localPath, {
      folder: "Profile Images",
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = new UserModel({
      profilePic: result.secure_url,
      publicid: result.public_id,
      name,
      email,
      phone,
      role,
      password: hashedPassword,
    });
    const createdUser = await createUser.save();
    return res.status(201).json({
      status: true,
      message: "You have been registered successfully..!!",
      createdUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to register new user",
      error: error.message,
    });
  } finally {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  }
};

//--------------User Login---------------//
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Unauthorized, Incorrect email address..!!",
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(403).json({
        status: false,
        message: "Unauthorized, Incorrect password entered..!!",
      });
    }

    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_ID,
      { expiresIn: "24h" },
    );

    return res.status(200).json({
      status: true,
      message: "Login Successfully..!!",
      userId: user._id,
      name: user.name,
      role: user.role,
      jwtToken,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to log you in",
      error: error.message,
    });
  }
};

//------------------fetch customers admin--------------------//
const fetchCustomers = async (req, res) => {
  try {
    const customers = await UserModel.find();
    if (!customers || customers.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "No data found of customers..!! " });
    }
    return res
      .status(200)
      .json({ status: true, message: "All customers data", customers });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "unable to fetch customers data",
      error: error.message,
    });
  }
};

const customerDetail = async (req, res) => {
  try {
    const { id } = req.user;
    const customerDetail = await UserModel.findById(id);
    if (!customerDetail) {
      return res
        .status(404)
        .json({ status: false, message: "Customer data not found..!!" });
    }
    return res.status(200).json({
      status: true,
      message: "Customer details found..!!",
      customerDetail,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to fetch customer details..!!",
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const localPath = req.file.path;

    const user = await UserModel.findById(id);
    if (!user) {
      return res
        .status(403)
        .json({ status: false, message: "No user found..!!" });
    }

    const result = await cloudinary.uploader.upload(localPath, {
      folder: "Profile Images",
    });

    if (!result) {
      return res.status(403).json({
        status: false,
        message: "Can't upload your profile image to server..!!",
      });
    }

    if (user.publicid) {
      await cloudinary.uploader.destroy(user.publicid);
    }

    const profileRes = await UserModel.findByIdAndUpdate(
      id,
      { profilePic: result.secure_url, publicid: result.public_id },
      { returnDocument: "after" },
    );

    return res.status(201).json({
      status: true,
      message: "Profile image changed successfully..!!",
      profileRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to change / update profile pic..!!",
      error: error.message,
    });
  } finally {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  }
};

//-----------------------update details--------------------//
const updateCustomerDetails = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, email, phone, password } = req.body;

    const user = await UserModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User not found..!!" });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (password) {
      const isSame = await bcrypt.compare(password, user.password);
      if (isSame) {
        return res.status(400).json({
          status: false,
          message: "New password cannot be the same as old password..!!",
        });
      }
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updateRes = await UserModel.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
    });

    return res.status(200).json({
      status: true,
      message: "User details updated successfully..!!",
      updateRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to update user details..!!",
      error: error.message,
    });
  }
};

//---------------add address----------------//
const updateUserAddress = async (req, res) => {
  try {
    const { id } = req.user;
    const { address, state, pincode } = req.body;
    const addressRes = await UserModel.findByIdAndUpdate(
      id,
      { $push: { items: { address, state, pincode } } },
      { upsert: true, returnDocument: "after" },
    );
    if (!addressRes) {
      return res
        .status(404)
        .json({ status: false, message: "User not found..!!" });
    }
    return res.status(201).json({
      status: true,
      message: "Address has been updated and saved..!!",
      addressRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to update address",
      error: error.message,
    });
  }
};

//------------------delete address------------------//
const deleteUserAddress = async (req, res) => {
  try {
    const { id } = req.user;
    const { addressId } = req.body;
    const deleteRes = await UserModel.findByIdAndUpdate(
      id,
      { $pull: { items: { _id: addressId } } },
      { returnDocument: "after" },
    );
    if (!deleteRes) {
      return res
        .status(404)
        .json({ status: false, message: "No address data found..!!" });
    }
    return res.status(200).json({
      status: true,
      message: "Address deleted successfully..!!",
      deleteRes,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Unable to delete address..!!" });
  }
};

//------------------------Delete user and linked details------------------------//

const deleteUserAndDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const orderDetails = await OrderModel.find({ user: id });
    if (orderDetails && orderDetails.length > 0) {
      const hasActiveOrders = await orderDetails.some(
        (p) => p.status !== "Cancelled" && p.status !== "Delivered",
      );
      if (hasActiveOrders) {
        return res.status(403).json({
          status: false,
          message: "This user still has active order can't delete user..!!",
        });
      }
    }
    await CartModel.findOneAndDelete({ user: id });
    await WishlistModel.findOneAndDelete({ user: id });
    await ReviewsModel.deleteMany({ user: id });
    await OrderModel.deleteMany({ user: id });
    await SupportModel.deleteMany({ user: id });

    const user = await UserModel.findById(id);

    if (user?.publicid) {
      await cloudinary.uploader.destroy(user.publicid);
    }

    const deleteRes = await UserModel.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      message: "User and all linked details deleted successfully..!!",
      deleteRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to delete user and linked details..!!",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  userLogin,
  fetchCustomers,
  customerDetail,
  updateProfile,
  updateCustomerDetails,
  updateUserAddress,
  deleteUserAddress,
  deleteUserAndDetails,
};
