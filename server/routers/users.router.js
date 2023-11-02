const express = require("express");
const usersController = require("../controllers/users.controller");
const { upload } = require("../middleware/uploadsAvatar");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.route("/").get(usersController.getAllUsers);

router
  .route("/register")
  .post(upload.single("avatar"), usersController.register);

router.route("/signin").post(usersController.signin);

router.route("/cart").patch(verifyToken, usersController.updateCountProduct);

router
  .route("/cart/:productId")
  .post(verifyToken, usersController.addCart)
  .delete(verifyToken, usersController.deleteProductToCart);

router
  .route("/love/:productId")
  .post(verifyToken, usersController.addLove)
  .delete(verifyToken, usersController.deleteProductToLove);

module.exports = router;
