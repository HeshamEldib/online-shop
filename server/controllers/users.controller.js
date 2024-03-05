const bcrypt = require("bcryptjs");
const User = require("../modules/user");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");
const generateJWT = require("../utils/generateJWT");

const AWS = require('aws-sdk');

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


const getAllUsers = asyncWrapper(async (req, res, next) => {
  const users = await User.find({}, { __v: false });

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { users },
  });
});

const getUser = asyncWrapper(async (req, res, next) => {
  const userToken = req.params.userToken;
  const user = await User.findOne(
    { token: userToken },
    { __v: false, password: false }
  );

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { user },
  });
});

const register = asyncWrapper(async (req, res, next) => {
  const { userName, email, password, role, mobile, address } = req.body;

  // find user
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    const error = appError.create(
      "wrong email or password",
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
    role,
  });

  const token = await generateJWT({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });
  newUser.token = token;

  await newUser.save();
  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { userToken: newUser.token },
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

  res.json({
    status: httpStatusText.SUCCESS,
    data: { userToken: user.token },
  });
});

const updateUser = asyncWrapper(async (req, res, next) => {
  const userToken = req.params.userToken;
  const { userName, mobile, address } = req.body;
  const user = await User.findOne({ token: userToken }, { __v: false });

  userName !== undefined && (user.userName = userName);
  mobile !== undefined && (user.mobile = mobile);
  address !== undefined && (user.address = address);
  // role !== undefined && (user.role = role);



  const params = {
    Bucket: 'your-s3-bucket-name',
    Key: req.file.originalname, // Use the original filename
    Body: req.file.buffer, // Image data
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading to S3:', err);
      res.status(500).json({ error: 'Image upload failed' });
    } else {
      console.log('Image uploaded to S3:', data.Location);
      res.status(200).json({ message: 'Image uploaded to S3 successfully!' });
    }})





  req.file !== undefined && (user.avatar = `uploads/${req.file.filename}`);

  await user.save();
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { user },
  });
});

const deleteUser = asyncWrapper(async (req, res, next) => {
  const userToken = req.params.userToken;
  const { password } = req.body;
  const user = await User.findOne({ token: userToken }, { __v: false });

  matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    const error = appError.create(
      "password is failed",
      500,
      httpStatusText.ERROR
    );
    return next(error);
  }

  await User.deleteOne({ _id: userId });

  return res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  getAllUsers,
  getUser,
  register,
  signin,
  deleteUser,
  updateUser,
};
