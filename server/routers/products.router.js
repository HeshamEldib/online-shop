const express = require("express");
const productsController = require("../controllers/products.controller");
const commentController = require("../controllers/commentProduct");
const ratingController = require("../controllers/ratingProduct");
const { validationProduct } = require("../middleware/validationProduct");
const verifyToken = require("../middleware/verifyToken");
const allowedTo = require("../middleware/allowedTo");
const userRoles = require("../utils/userRoles");

const router = express.Router();

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.MANGER),
    validationProduct(),
    productsController.addProduct
  );

router
  .route("/:productId")
  .get(productsController.getProduct)
  .patch(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.MANGER),
    productsController.updateProduct
  )
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.MANGER),
    productsController.deleteProduct
  );

router
  .route("/:productId/comment/")
  .post(verifyToken, commentController.addCommentProduct);

router
  .route("/:productId/comment/:commentId")
  .patch(verifyToken, commentController.updateCommentProduct)
  .delete(verifyToken, commentController.deleteCommentProduct);

router
  .route("/:productId/rating")
  .post(verifyToken, ratingController.addRating)
  .patch(verifyToken, ratingController.updateRating);

module.exports = router;
