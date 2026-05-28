const verifyAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res
      .status(403)
      .json({ status: false, message: "Unauthorized, Admins access only..!!" });
  }
  next();
};

module.exports = { verifyAdmin };
