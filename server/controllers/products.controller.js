const Product = require("../modules/product");
const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const asyncWrapper = require("../middleware/asyncWrapper");

const getAllProducts = asyncWrapper(async (req, res, next) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const products = await Product.find({}, { __v: false })
    .limit(limit)
    .skip(skip);

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { products },
  });
});

const getProduct = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.find({ _id: productId }, { __v: false });
  if (!product) {
    const error = appError.create(
      "product not found",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { product },
  });
});

const addProduct = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, httpStatusText.FAIL);
    return next(error);
  }
  const newProduct = new Product(req.body);
  await newProduct.save();

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { newProduct },
  });
});

const updateProduct = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const updatedProduct = await Product.updateOne({ _id: productId }, req.body);

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { product: updatedProduct },
  });
});

const deleteProduct = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  await Product.deleteOne({ _id: productId });

  return res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
