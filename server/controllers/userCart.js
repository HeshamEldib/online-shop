const User = require("../modules/user");
const Product = require("../modules/product");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");

const addCart = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;

  const product = await Product.findOne({ _id: productId });
  if (!product) {
    const error = appError.create(
      "Product not found",
      404,
      httpStatusText.ERROR
    );
    return next(error);
  }

  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  const user = await User.findOne({ token });

  for (const product of user.cart) {
    if (product.productId === productId) {
      const error = appError.create(
        "Product already found",
        400,
        httpStatusText.FAIL
      );
      return next(error);
    }
  }

  user.cart.push({ productId });
  await user.save();
  res.json({
    status: httpStatusText.SUCCESS,
    data: { cart: user.cart },
  });
});

const updateCountProduct = asyncWrapper(async (req, res, next) => {
  const { productId, count = 1 } = req.body;

  if (count <= 0) {
    const error = appError.create(
      "the count cannot be negative or equal to zero",
      500,
      httpStatusText.FAIL
    );
    return next(error);
  }

  if (!productId) {
    const error = appError.create(
      "productId is required",
      500,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  const user = await User.findOne({ token });

  let findProductToCart = false;
  for (const product of user.cart) {
    if (product.productId === productId) {
      product.count = count;
      findProductToCart = true;
      break;
    }
  }

  if (!findProductToCart) {
    const error = appError.create(
      "Product not found to cart",
      404,
      httpStatusText.ERROR
    );
    return next(error);
  }

  await user.save();
  res.json({
    status: httpStatusText.SUCCESS,
    data: { cart: user.cart },
  });
});

const deleteProductToCart = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;

  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  const user = await User.findOne({ token });

  let findProductToCart = false;
  for (let i = 0; i < user.cart.length; i++) {
    if (user.cart[i].productId === productId) {
      user.cart.splice(i, 1);
      findProductToCart = true;
      break;
    }
  }
  if (!findProductToCart) {
    const error = appError.create(
      "Product not found to cart",
      404,
      httpStatusText.ERROR
    );
    return next(error);
  }

  await user.save();
  res.json({
    status: httpStatusText.SUCCESS,
    data: { cart: user.cart },
  });
});

module.exports = {
  addCart,
  updateCountProduct,
  deleteProductToCart,
};
