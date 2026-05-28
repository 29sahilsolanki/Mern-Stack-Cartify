const Joi = require("joi");
const updateValidation = (req, res, next) => {
  try {
    const Schema = Joi.object({
      name: Joi.string().min(3).max(100).optional(),
      email: Joi.string().email().optional(),
      phone: Joi.string().min(10).max(10).optional(),
      password: Joi.string().min(4).max(20).optional().allow(""),
      confirmPassword: Joi.string().min(4).max(20).optional().allow(""),
    });
    const { error } = Schema.validate(req.body);
    if (error) {
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

module.exports = { updateValidation };
