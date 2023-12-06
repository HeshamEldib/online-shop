const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const asyncWrapper = require("../middleware/asyncWrapper");
const userRoles = require("../utils/userRoles");
const { getOneProduct } = require("../middleware/getContent");

const addCommentProduct = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await getOneProduct(productId);

  const authorization = req.headers.authorization || req.headers.Authorization;
  const token = authorization.split(" ")[1];
  const { content } = req.body;

  product.comment.push({ author: token, content });
  await product.save();

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { content: { author: token, content } },
  });
});

const updateCommentProduct = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const commentId = req.params.commentId;
  const authorization = req.headers.authorization || req.headers.Authorization;
  const token = authorization.split(" ")[1];
  const { content } = req.body;

  const product = await getOneProduct(productId);

  let findComment = false;
  for (const comment of product.comment) {
    if (`${comment._id}` === commentId) {
      if (comment.author === token) {
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
  const authorization = req.headers.authorization || req.headers.Authorization;
  const token = authorization.split(" ")[1];

  const product = await getOneProduct(productId);

  for (let i = 0; i < product.comment.length; i++) {
    if (`${product.comment[i]._id}` === commentId) {
      if (
        product.comment[i].author === token ||
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
