const bcrypt = require("bcryptjs");
const User = require("../modules/user");
const Product = require("../modules/product");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");
const generateJWT = require("../utils/generateJWT");

const getAllUsers = asyncWrapper(async (req, res, next) => {
  const users = await User.find({}, { __v: false });

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { users },
  });
});

const register = asyncWrapper(async (req, res, next) => {
  const { userName, email, password, roles } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    const error = appError.create(
      "user already exists",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const hashPassword = await bcrypt.hashSync(password, 10);

  const newUser = new User({
    userName,
    email,
    password: hashPassword,
    roles,
    avatar: req.file.filename,
  });

  const token = await generateJWT({
    email: newUser.email,
    id: newUser._id,
    roles: newUser.roles,
  });
  newUser.token = token;

  await newUser.save();
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { user: newUser },
  });
});

const signin = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const message =
      !email && !password
        ? "email and password are required"
        : !email
        ? "email is required"
        : "password is required";
    const error = appError.create(message, 400, httpStatusText.FAIL);
    return next(error);
  }

  const user = await User.findOne({ email });
  if (!user) {
    const error = appError.create("user not found", 400, httpStatusText.FAIL);
    return next(error);
  }

  matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    const error = appError.create(
      "password is failed",
      500,
      httpStatusText.ERROR
    );
    return next(error);
  }

  const token = await generateJWT({
    email: user.email,
    id: user._id,
    roles: user.roles,
  });
  res.json({
    status: httpStatusText.SUCCESS,
    data: { token },
  });
});

// cart
const addCart = asyncWrapper(async (req, res, next) => {
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

  for (const product of user.cart) {
    if (product.productId === productId) {
      const error = appError.create(
        "Product already found",
        400,
        httpStatusText.FAIL
      );
      return next(error);
    }
  }

  user.cart.push({ productId });
  await user.save();
  res.json({
    status: httpStatusText.SUCCESS,
    data: { cart: user.cart },
  });
});

const updateCountProduct = asyncWrapper(async (req, res, next) => {
  const { productId, count = 1 } = req.body;

  if (count <= 0) {
    const error = appError.create(
      "the count cannot be negative or equal to zero",
      500,
      httpStatusText.FAIL
    );
    return next(error);
  }

  if (!productId) {
    const error = appError.create(
      "productId is required",
      500,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  const user = await User.findOne({ token });

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
    data: { cart: user.cart },
  });
});

const deleteProductToCart = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;

  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  const user = await User.findOne({ token });

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
    data: { cart: user.cart },
  });
});

// love
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
  getAllUsers,
  register,
  signin,
  addCart,
  updateCountProduct,
  deleteProductToCart,
  addLove,
  deleteProductToLove,
};
