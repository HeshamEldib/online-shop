const { body } = require("express-validator");

const validationProduct = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("title is required")
      .isLength({ min: 2 })
      .withMessage("title at least is 2 digits"),
    body("price").notEmpty().withMessage("price is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("category").notEmpty().withMessage("category is required"),
    // body("image").notEmpty().withMessage("image is required"),
  ];
};

module.exports = { validationProduct };
