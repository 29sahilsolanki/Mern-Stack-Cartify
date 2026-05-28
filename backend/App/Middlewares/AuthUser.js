const jwt = require("jsonwebtoken");
const authUser = async (req, res, next) => {
  try {
    const auth = req.headers["authorization"];
    if (!auth) {
      return res.status(403).json({
        status: false,
        message: "Unauthorized, Jwt token is required..!!",
      });
    }
    const decoded = await jwt.verify(auth, process.env.SECRET_ID);
    req.user = decoded;

    if (!decoded) {
      return res.status(403).json({
        status: false,
        message: "Unauthorized, Jwt token is wrong or expired..!!",
      });
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

module.exports = { authUser };
