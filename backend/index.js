require("dotenv").config();
const { dbConnection } = require("./App/Db/db");
dbConnection();
const cors = require("cors");
const express = require("express");
const { userRouter } = require("./App/Routes/userRouter");
const { paymentRouter } = require("./App/Routes/paymentRouter");
require("./App/Models/ReviewsModel");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/cartify", userRouter);
app.use("/transaction", paymentRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("App is listening on port: ", port);
});
