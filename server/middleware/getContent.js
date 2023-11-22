const User = require("../modules/user");
const Product = require("../modules/product");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");

const getOneProduct = async (productId) => {
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    const error = appError.create(
      "Product not found",
      404,
      httpStatusText.ERROR
    );
    return next(error);
  }
  return product;
};

const getOneUser = async (userId) => {
  const user = await User.findOne(
    { _id: userId },
    { __v: false, password: false }
  );
  return user;
};

module.exports = {
  getOneProduct,
  getOneUser,
};
