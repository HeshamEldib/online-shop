const express = require("express");
const productsController = require("../controllers/products.controller");
const commentController = require("../controllers/commentProduct");
const ratingController = require("../controllers/ratingProduct");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

//  products/
router.route("/").get(productsController.getAllProducts);

router.route("/search").post(productsController.getSearchProduct);

router.route("/:productId").get(productsController.getProduct);

// product comment
router
  .route("/:productId/comment/")
  .post(verifyToken, commentController.addCommentProduct);

router
  .route("/:productId/comment/:commentId")
  .patch(verifyToken, commentController.updateCommentProduct)
  .delete(verifyToken, commentController.deleteCommentProduct);

// product rating
router
  .route("/:productId/rating")
  .get(verifyToken, ratingController.getRating)
  .post(verifyToken, ratingController.addAndUpdateRating);
// .patch(verifyToken, ratingController.updateRating);

module.exports = router;
