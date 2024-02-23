const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middleware/asyncWrapper");
const { getOneProduct } = require("../middleware/getContent");

const getRating = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await getOneProduct(productId);

  const user = req.currentUser;

  const arrRating = product.rating.ratings;
  let rating = 0;
  for (let i = 0; i < arrRating.length; i++) {
    if (arrRating[i].user == user.id) {
      rating = arrRating[i].rating;
    }
  }

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { rating },
  });
});

const addAndUpdateRating = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await getOneProduct(productId);

  const user = req.currentUser;
  const { rating } = req.body;

  const arrRating = product.rating.ratings;
  let findRating = false;
  for (let i = 0; i < arrRating.length; i++) {
    if (arrRating[i].user == user.id) {
      product.rating.ratings[i].rating = rating;
      findRating = true;
    }
  }
  if (!findRating) {
    product.rating.ratings.push({ user: user.id, rating });
  }

  const totalRating = arrRating.reduce((previous, current) => {
    return previous + (current.rating || 0);
  }, 0);
  product.rating.count = arrRating.length;
  const rate = totalRating / (arrRating.length === 0 ? 1 : arrRating.length);
  product.rating.rate = rate.toFixed(1);

  await product.save();

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { rating },
  });
});

module.exports = {
  getRating,
  addAndUpdateRating,
};
