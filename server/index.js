require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const httpStatusText = require("./utils/httpStatusText");
const productsRouters = require("./routers/products.router");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connecting data");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouters);
app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: httpStatusText.ERROR,
    message: "this resource is not fount",
  });
});

app.use((error, req, res, next) => {
  res
    .status(error.statusCode || 200)
    .json({
      status: error.statusText,
      message: error.message,
      code: error.statusCode || 500,
      data: null,
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
