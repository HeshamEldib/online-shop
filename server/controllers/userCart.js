const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");
const { getOneProduct, getOneUser } = require("../middleware/getContent");

const getAllFromCart = asyncWrapper(async (req, res, next) => {
  const userId = req.currentUser.id;
  const user = await getOneUser(userId);
  const groupProducts = user.cart;
  let products = [];
  for (let i = 0; i < groupProducts.length; i++) {
    const product = await getOneProduct(groupProducts[i].productId);
    products.push({ product, count: groupProducts[i].count });
  }

  if (products.isEmpty) {
    const error = appError.create(
      "group products is empty",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { products },
  });
});

const addCart = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await getOneProduct(productId);

  const userId = req.currentUser.id;
  const user = await getOneUser(userId);

  let find = false;
  let count = 1;
  for (const product of user.cart) {
    if (product.productId === productId) {
      product.count += 1;
      count = product.count;
      find = true;
      break;
    }
  }

  if (!find) {
    user.cart.push({ productId });
  }
  await user.save();
  res.json({
    status: httpStatusText.SUCCESS,
    data: { product, count },
  });
});

const updateCountProduct = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const { count = 1 } = req.body;

  if (count <= 0) {
    const error = appError.create(
      "the count cannot be negative or equal to zero",
      500,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const product = await getOneProduct(productId);

  const userId = req.currentUser.id;
  const user = await getOneUser(userId);

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
    data: { product, count },
  });
});

const deleteProductToCart = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await getOneProduct(productId);

  const userId = req.currentUser.id;
  const user = await getOneUser(userId);

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
    data: { product },
  });
});

module.exports = {
  getAllFromCart,
  addCart,
  updateCountProduct,
  deleteProductToCart,
};
