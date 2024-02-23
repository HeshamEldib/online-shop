const Product = require("../modules/product");
const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const asyncWrapper = require("../middleware/asyncWrapper");
const userRoles = require("../utils/userRoles");
const { getOneProduct, getOneUser } = require("../middleware/getContent");
const User = require("../modules/user");

const getMyProducts = asyncWrapper(async (req, res, next) => {
  const author = req.currentUser;
  const user = await User.findOne({ _id: author.id });
  const myProductsIds = user.products;

  let myProducts = [];
  for (let i = 0; i < myProductsIds.length; i++) {
    const product = await getOneProduct(myProductsIds[i]);
    myProducts.push(product);
  }

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { myProducts },
  });
});

const addProduct = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, httpStatusText.FAIL);
    return next(error);
  }

  const image = `uploads/${req.file.filename}`;

  const author = req.currentUser;
  const user = await User.findOne({ _id: author.id });
  const newProduct = new Product({ ...req.body, image, author: author.id });
  user["products"].push(`${newProduct._id}`);
  await user.save();
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
  const { title, price, category, description } = req.body;

  if (product.author !== user.id) {
    const error = appError.create(
      "this the user is not creating this product",
      403,
      httpStatusText.FAIL
    );
    return next(error);
  }
  title !== undefined && (product.title = title);
  price !== undefined && (product.price = price);
  category !== undefined && (product.category = category);
  description !== undefined && (product.description = description);

  req.file !== undefined && (product.image = `uploads/${req.file.filename}`);

  await product.save();
  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { product },
  });
});

const deleteProduct = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await getOneProduct(productId);
  const user = req.currentUser;
  const u = await getOneUser(user.id);

  if (product.author === user.id || user.role === userRoles.MANGER) {
    await Product.deleteOne({ _id: productId });
  } else {
    const error = appError.create(
      "this the user is not creating this product",
      403,
      httpStatusText.FAIL
    );
    return next(error);
  }

  for (let i = 0; i < u.products.length; i++) {
    if (u.products[i] === productId) {
      u.products.splice(i, 1);
    }
  }

  await u.save();
  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: product });
});

module.exports = {
  getMyProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
