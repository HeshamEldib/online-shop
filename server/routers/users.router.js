const express = require("express");
const usersController = require("../controllers/users.controller");
const cartController = require("../controllers/userCart");
const buyingController = require("../controllers/userBuying");
const loveController = require("../controllers/userLove");
const { upload } = require("../middleware/uploadsImages");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.route("/").get(usersController.getAllUsers);

router
  .route("/:userToken")
  .get(usersController.getUser)
   .patch(upload.single("avatar"), usersController.updateUser)
  .delete(usersController.deleteUser);

router.route("/register").post(usersController.register);

router.route("/signin").post(usersController.signin);

router
  .route("/cart/:productId")
  .get(verifyToken, cartController.getAllFromCart)
  .post(verifyToken, cartController.addCart)
  .patch(verifyToken, cartController.updateCountProduct)
  .delete(verifyToken, cartController.deleteProductToCart);

router
  .route("/buying/:productId")
  .get(verifyToken, buyingController.getAllBuying)
  .post(verifyToken, buyingController.addBuying)
  .delete(verifyToken, buyingController.deleteBuying);
router
  .route("/buying/allItem/:productId")
  .post(verifyToken, buyingController.addAllBuying)
  .delete(verifyToken, buyingController.deleteAllBuying);

// router.route("/love").get(verifyToken, loveController.getGroupProducts);
router
  .route("/love/:productId")
  .get(verifyToken, loveController.getGroupProducts)
  .post(verifyToken, loveController.addLove)
  .delete(verifyToken, loveController.deleteProductToLove);

module.exports = router;
