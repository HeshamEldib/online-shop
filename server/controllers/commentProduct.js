const Product = require("../modules/product");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const asyncWrapper = require("../middleware/asyncWrapper");
const userRoles = require("../utils/userRoles");

const addCommentProduct = asyncWrapper(async (req, res, next) => {
  console.log("currentUser => ", req.currentUser);
  const productId = req.params.productId;
  const user = req.currentUser;
  const { content } = req.body;

  const product = await Product.findOne({ _id: productId });
  if (!product) {
    const error = appError.create(
      "Product not found",
      404,
      httpStatusText.ERROR
    );
    return next(error);
  }

  product.comment.push({ user: user.id, content });
  await product.save();

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { content: product.comment },
  });
});

const updateCommentProduct = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const commentId = req.params.commentId;
  const user = req.currentUser;
  const { content } = req.body;

  const product = await Product.findOne({ _id: productId });
  if (!product) {
    const error = appError.create(
      "Product not found",
      404,
      httpStatusText.ERROR
    );
    return next(error);
  }

  let findComment = false;
  for (const comment of product.comment) {
    if (`${comment._id}` === commentId) {
      if (comment.user === user.id) {
        comment.content = content;
        findComment = true;
        break;
      } else {
        const error = appError.create(
          "this the user is not creating this comment",
          403,
          httpStatusText.FAIL
        );
        return next(error);
      }
    }
  }
  if (!findComment) {
    const error = appError.create(
      "Comment not found",
      404,
      httpStatusText.ERROR
    );
    return next(error);
  }

  await product.save();

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { content: product.comment },
  });
});

const deleteCommentProduct = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const commentId = req.params.commentId;
  const user = req.currentUser;

  const product = await Product.findOne({ _id: productId });

  for (let i = 0; i < product.comment.length; i++) {
    if (`${product.comment[i]._id}` === commentId) {
      if (
        product.comment[i].user === user.id ||
        user.role === userRoles.MANGER
      ) {
        product.comment.splice(i, 1);
      } else {
        const error = appError.create(
          "this the user is not creating this comment",
          403,
          httpStatusText.FAIL
        );
        return next(error);
      }
    }
  }

  await product.save();

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { content: product.comment },
  });
});

module.exports = {
  addCommentProduct,
  updateCommentProduct,
  deleteCommentProduct,
};
