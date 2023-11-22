const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");
const { getOneProduct, getOneUser } = require("../middleware/getContent");

const addLove = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await getOneProduct(productId);

  const userId = req.currentUser.id;
  const user = await getOneUser(userId);

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
    data: { product },
  });
});

const deleteProductToLove = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await getOneProduct(productId);

  const userId = req.currentUser.id;
  const user = await getOneUser(userId);

  let findProductToLove = false;
  for (let i = 0; i < user.love.length; i++) {
    if (user.love[i] === productId) {
      user.love.splice(i, 1);
      findProductToLove = true;
      break;
    }
  }
  if (!findProductToLove) {
    const error = appError.create(
      "Product not found to love",
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

const getGroupProducts = asyncWrapper(async (req, res, next) => {
  const userId = req.currentUser.id;
  const user = await getOneUser(userId);

  const groupProducts = user.love;
  let products = [];
  for (let i = 0; i < groupProducts.length; i++) {
    const product = await getOneProduct(groupProducts[i]);
    products.push(product);
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

module.exports = {
  addLove,
  deleteProductToLove,
  getGroupProducts,
};
