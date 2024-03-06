const express = require("express");
const myProductsController = require("../controllers/myProducts");
const { validationProduct } = require("../middleware/validationProduct");
const verifyToken = require("../middleware/verifyToken");
const allowedTo = require("../middleware/allowedTo");
const userRoles = require("../utils/userRoles");
const { upload } = require("../middleware/uploadsImages");

const router = express.Router();

// my products
router
  .route("/")
  .get(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.MANGER),
    myProductsController.getMyProducts
  )
  .post(
    verifyToken,
    upload.single("image"),
    allowedTo(userRoles.ADMIN, userRoles.MANGER),
    validationProduct(),
    myProductsController.addProduct
  );


router
  .route("/:productId")
  .patch(
    verifyToken,
    upload.single("image"),
    allowedTo(userRoles.ADMIN, userRoles.MANGER),
    myProductsController.updateProduct
  )
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.MANGER),
    myProductsController.deleteProduct
  );

module.exports = router;
