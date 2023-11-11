const express = require("express");
const usersController = require("../controllers/users.controller");
const cartController = require("../controllers/userCart");
const loveController = require("../controllers/userLove");
const { upload } = require("../middleware/uploadsAvatar");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.route("/").get(usersController.getAllUsers);

router
  .route("/:userToken")
  .get(usersController.getUser)
  .patch(upload.single("avatar"), usersController.updateUser)
  .delete(usersController.deleteUser);

router
  .route("/register")
  .post(usersController.register);

router.route("/signin").post(usersController.signin);

router.route("/cart").patch(verifyToken, cartController.updateCountProduct);

router
  .route("/cart/:productId")
  .post(verifyToken, cartController.addCart)
  .delete(verifyToken, cartController.deleteProductToCart);


router
  .route("/love")
  .get(verifyToken, loveController.getGroupProducts)
router
  .route("/love/:productId")
  .get(verifyToken, loveController.getGroupProducts)
  .post(verifyToken, loveController.addLove)
  .delete(verifyToken, loveController.deleteProductToLove);

module.exports = router;
