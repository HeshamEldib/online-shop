const mongoose = require("mongoose");
const userRoles = require("../utils/userRoles");
const product = require("./product");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANGER],
    default: userRoles.USER,
  },
  avatar: {
    type: String,
    default: "uploads/H1.png",
  },
  cart: {
    type: [
      {
        productId: {
          type: String,
          unique: true,
        },
        count: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  love: {
    type: [String],
  },
  buying: {
    type: [
      {
        productId: {
          type: String,
          required: true,
          unique: true,
        },
        count: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  mobile: {
    type: Number,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  products: {
    type: [String],
  },
});

module.exports = mongoose.model("User", userSchema);
