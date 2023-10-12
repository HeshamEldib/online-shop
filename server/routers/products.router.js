const express = require("express");
const productsController = require("../controllers/products.controller");
const { validationProduct } = require("../middleware/validationProduct");

const router = express.Router();

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(validationProduct(), productsController.addProduct);

router
  .route("/:productId")
  .get(productsController.getProduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

module.exports = router;
