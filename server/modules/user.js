const mongoose = require("mongoose");
const userRoles = require("../utils/userRoles");

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
});

module.exports = mongoose.model("User", userSchema);
