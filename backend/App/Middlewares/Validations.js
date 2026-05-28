const Joi = require("joi");
const fs = require("fs");
const signupValidation = (req, res, next) => {
  try {
    const Schema = Joi.object({
      name: Joi.string().min(3).max(100).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(10).max(10).required(),
      password: Joi.string().min(4).max(20).required(),
    });
    const { error } = Schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: false, message: error?.details[0]?.message });
    }
    next();
  } catch (error) {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({
      status: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

const loginValidation = (req, res, next) => {
  try {
    const Schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(20).required(),
    });
    const { error } = Schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: false, message: error?.details[0]?.message });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

const productValidation = async (req, res, next) => {
  try {
    const Schema = Joi.object({
      title: Joi.string().min(3).required(),
      description: Joi.string().min(10).required(),
      price: Joi.number().required().min(0),
      stock: Joi.number().integer().min(0).required(),
      category: Joi.string().min(3).max(100).required(),
    });
    const { error } = Schema.validate(req.body);
    if (error) {
      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res
        .status(403)
        .json({ status: false, message: error?.details[0]?.message });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

module.exports = { signupValidation, loginValidation, productValidation };
