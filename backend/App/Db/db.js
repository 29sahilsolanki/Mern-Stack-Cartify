const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongoDb connected successfully");
  } catch (error) {
    console.log("mongoDb connection failed");
  }
};

module.exports = { dbConnection };
