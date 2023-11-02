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
  roles: {
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
        productId: { type: String },
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
});

module.exports = mongoose.model("User", userSchema);
