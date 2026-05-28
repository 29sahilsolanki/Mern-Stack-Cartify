const { valid } = require("joi");
const Jwt = require("jsonwebtoken");
const AppRefresh = async (req, res) => {
  try {
    const auth = req.headers["authorization"];
    if (!auth) {
      return res.status(401).json({
        valid: false,
        message: "Unauthorized, Jwt token is required..!!",
      });
    }
    const decoded = Jwt.verify(auth, process.env.SECRET_ID);

    return res.status(200).json({
      valid: true,
      message: "JWT token is still valid..!!",
    });
  } catch (error) {
    return res.status(401).json({
      valid: false,
      message: "Unauthorized, JWT token is wrong or expired..!!",
      error: error.message,
    });
  }
};

module.exports = { AppRefresh };
