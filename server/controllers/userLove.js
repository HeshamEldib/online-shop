const User = require("../modules/user");
const Product = require("../modules/product");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");

const addLove = asyncWrapper(async (req, res, next) => {
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

  for (const product of user.love) {
    if (product === productId) {
      const error = appError.create(
        "Product already found",
        400,
        httpStatusText.FAIL
      );
      return next(error);
    }
  }

  user.love.push(productId);
  await user.save();
  res.json({
    status: httpStatusText.SUCCESS,
    data: { love: user.love },
  });
});

const deleteProductToLove = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;

  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  const user = await User.findOne({ token });

  let findProductToCart = false;
  for (let i = 0; i < user.love.length; i++) {
    if (user.love[i] === productId) {
      user.love.splice(i, 1);
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
    data: { love: user.love },
  });
});

module.exports = {
  addLove,
  deleteProductToLove,
};
