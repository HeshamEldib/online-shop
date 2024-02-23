const Product = require("../modules/product");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middleware/asyncWrapper");
const { getOneProduct } = require("../middleware/getContent");

const getAllProducts = asyncWrapper(async (req, res, next) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const category = query.category || "all";

  const products =
    category === "all"
      ? await Product.find({}, { __v: false }).limit(limit).skip(skip).exec()
      : await Product.find({ category }, { __v: false })
          .limit(limit)
          .skip(skip)
          .exec();

  const count =
    category === "all"
      ? await Product.countDocuments()
      : await Product.countDocuments({ category });

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: {
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: +page,
    },
  });
});

const getProduct = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await getOneProduct(productId);

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { product },
  });
});

const getSearchProduct = asyncWrapper(async (req, res, next) => {
  const searchProduct = req.params.searchProduct;
  const products = await Product.aggregate().search({ title: searchProduct });

  console.log(products);
  // res.status(200).json({
  //   status: httpStatusText.SUCCESS,
  //   data: { product },
  // });
});

module.exports = {
  getAllProducts,
  getProduct,
  getSearchProduct,
};
