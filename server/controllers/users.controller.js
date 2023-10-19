const bcrypt = require("bcryptjs");
const User = require("../modules/user");
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

const login = asyncWrapper(async (req, res, next) => {
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

module.exports = {
  getAllUsers,
  register,
  login,
};
