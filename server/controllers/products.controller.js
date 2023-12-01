const Product = require("../modules/product");
const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const asyncWrapper = require("../middleware/asyncWrapper");
const userRoles = require("../utils/userRoles");
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

const addProduct = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, httpStatusText.FAIL);
    return next(error);
  }

  const user = req.currentUser;
  const newProduct = new Product({ ...req.body, user: user.id });
  await newProduct.save();

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { newProduct },
  });
});

const updateProduct = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await getOneProduct(productId);

  const user = req.currentUser;

  if (product.user === user.id) {
    var updatedProduct = await Product.updateOne({ _id: productId }, req.body);
  } else {
    const error = appError.create(
      "this the user is not creating this product",
      403,
      httpStatusText.FAIL
    );
    return next(error);
  }

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { product: updatedProduct },
  });
});

const deleteProduct = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await getOneProduct(productId);
  const user = req.currentUser;

  if (product.user === user.id || user.role === userRoles.MANGER) {
    await Product.deleteOne({ _id: productId });
  } else {
    const error = appError.create(
      "this the user is not creating this product",
      403,
      httpStatusText.FAIL
    );
    return next(error);
  }

  return res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
