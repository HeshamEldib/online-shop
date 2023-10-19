const express = require("express");
const usersController = require("../controllers/users.controller");
const { upload } = require("../middleware/uploadsAvatar");

const router = express.Router();

router.route("/").get(usersController.getAllUsers);

router
  .route("/register")
  .post(upload.single("avatar"), usersController.register);

router.route("/login").post(usersController.login);

module.exports = router;
