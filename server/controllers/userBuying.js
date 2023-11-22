const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");
const { getOneProduct, getOneUser } = require("../middleware/getContent");

const getAllBuying = asyncWrapper(async (req, res, next) => {
  const userId = req.currentUser.id;
  const user = await getOneUser(userId);
  const productsBuying = user.buying;

  let products = [];
  for (let i = 0; i < productsBuying.length; i++) {
    const product = await getOneProduct(productsBuying[i].productId);
    products.push({ product, count: productsBuying[i].count });
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

const addBuying = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await getOneProduct(productId);

  const userId = req.currentUser.id;
  const user = await getOneUser(userId);

  const { count } = req.body;

  for (const product of user.buying) {
    if (product.productId === productId) {
      const error = appError.create(
        "product is actually find",
        400,
        httpStatusText.FAIL
      );
      return next(error);
    }
  }

  user.buying.push({ productId, count });
  await user.save();
  res.json({
    status: httpStatusText.SUCCESS,
    data: { product, count },
  });
});

const deleteBuying = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await getOneProduct(productId);

  const userId = req.currentUser.id;
  const user = await getOneUser(userId);

  let findProductToBuying = false;
  for (let i = 0; i < user.buying.length; i++) {
    if (user.buying[i].productId === productId) {
      user.buying.splice(i, 1);
      findProductToBuying = true;
      break;
    }
  }
  if (!findProductToBuying) {
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

const addAllBuying = asyncWrapper(async (req, res, next) => {
  const userId = req.currentUser.id;
  const user = await getOneUser(userId);
  const cart = user.cart;
  const buying = user.buying;

  cart.forEach((itemCart) => {
    let find = false;
    buying.forEach((itemBuying) => {
      console.log("id => ", itemBuying);
      if (itemCart.productId === itemBuying.productId) {
        if (itemCart.count !== itemBuying.count) {
          itemBuying.count = itemCart.count;
        }
        find = true;
      }
    });
    if (!find) {
      user.buying.push(itemCart);
    }
  });

  await user.save();
  // res.json({
  //   status: httpStatusText.SUCCESS,
  //   data: { buying },
  // });
  getAllBuying(req, res, next);
});

const deleteAllBuying = asyncWrapper(async (req, res, next) => {
  const userId = req.currentUser.id;
  const user = await getOneUser(userId);

  user.buying = [];

  await user.save();
  res.json({
    status: httpStatusText.SUCCESS,
    data: { buying: user.buying },
  });
});

module.exports = {
  getAllBuying,
  addBuying,
  deleteBuying,
  addAllBuying,
  deleteAllBuying,
};
