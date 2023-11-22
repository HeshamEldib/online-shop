const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const asyncWrapper = require("../middleware/asyncWrapper");
const { getOneProduct } = require("../middleware/getContent");

const addRating = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await getOneProduct(productId);

  const user = req.currentUser;
  const { rating } = req.body;

  const arrRating = product.rating.ratings;
  for (let i = 0; i < arrRating.length; i++) {
    if (arrRating[i].user == user.id) {
      const error = appError.create(
        "this user has already rated it",
        403,
        httpStatusText.FAIL
      );
      return next(error);
    }
  }

  product.rating.ratings.push({ user: user.id, rating });
  const totalRating = arrRating.reduce((previous, current) => {
    return previous + (current.rating || 0);
  }, 0);
  product.rating.count = arrRating.length;
  const rate = totalRating / (arrRating.length === 0 ? 1 : arrRating.length);
  product.rating.rate = rate.toFixed(1);

  await product.save();

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { rating: product.rating },
  });
});

const updateRating = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await getOneProduct(productId);

  const user = req.currentUser;
  const { newRating } = req.body;

  const arrRating = product.rating.ratings;
  for (let i = 0; i < arrRating.length; i++) {
    if (arrRating[i].user === user.id) {
      arrRating[i].rating = newRating;
      break;
    }
  }

  product.rating.count = arrRating.length;
  const totalRating = arrRating.reduce((previous, current) => {
    return previous + (current.rating || 0);
  }, 0);
  const rate = totalRating / (arrRating.length === 0 ? 1 : arrRating.length);
  product.rating.rate = rate.toFixed(1);

  await product.save();

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { rating: product.rating },
  });
});

module.exports = {
  addRating,
  updateRating,
};
