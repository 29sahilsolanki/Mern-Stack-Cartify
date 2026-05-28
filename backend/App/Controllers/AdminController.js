const { UserModel } = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const fs = require("fs");
//cloudinary config
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const fetchAdminDetails = async (req, res) => {
  try {
    const { id } = req.user;
    const adminRes = await UserModel.findById(id);
    if (!adminRes) {
      return res
        .status(404)
        .json({ status: false, message: "Admin details not found..!!" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Admin details found..!!", adminRes });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to fetch admin details..!!",
      error: error.message,
    });
  }
};

//---------------------update profilepic----------------------//
const updateProfilePic = async (req, res) => {
  try {
    const { id } = req.user;
    const localPath = req.file.path;
    const user = await UserModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "No data found of user..!!" });
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
      {
        profilePic: result.secure_url,
        publicid: result.public_id,
      },
      { returnDocument: "after" },
    );
    return res.status(201).json({
      status: true,
      message: "Profile pic updated successfully..!!",
      profileRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to change / update profir pic..!!",
      error: error.message,
    });
  } finally {
    if (req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  }
};

//------------------update admin details--------------------//
const updateAdminDetails = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, email, phone, password } = req.body;

    const user = await UserModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User not found..!!" });
    }
    const update = {};
    if (name) update.name = name;
    if (email) update.email = email;
    if (phone) update.phone = phone;
    if (password) {
      const isPass = await bcrypt.compare(password, user.password);
      if (isPass) {
        return res.status(400).json({
          status: false,
          message: "New password cannot be the same as old password..!!",
        });
      }
      update.password = await bcrypt.hash(password, 10);
    }

    const updated = await UserModel.findByIdAndUpdate(id, update, {
      returnDocument: "after",
    });
    return res.status(200).json({
      status: true,
      message: "User details updated successfully..!!",
      updated,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to update user details..!!",
      error: error.message,
    });
  }
};
module.exports = { fetchAdminDetails, updateProfilePic, updateAdminDetails };
