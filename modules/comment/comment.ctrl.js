const HttpError = require('../../common/httpError');
const { uploadFile } = require('../../common/upload');
const db = require('../../db/db_helper');
const commentModel = require('./comment.model');

const createComment = async (req, res, next) => {
  const { user } = req;
  const bodyData = req.body;
  if (
    !bodyData.rate
    || !bodyData.content
    || !bodyData.product_id
  ) {
    throw new HttpError('field can not blank', 400);
  }

  const dataComment = {
    product_id: bodyData.product_id,
    createdBy: user.id,
    content: bodyData.content,
    rate: bodyData.rate,
  };

  const newComment = commentModel.createCommentItem(dataComment);

  res.send({
    status: 'success',
  });
};

const getListCommentByProductId = async (req, res, next) => {
  const { user } = req;
  const { comment_id } = req.params;

  const listComment = await commentModel.getListComment(comment_id);
  if (!listComment) {
    throw new HttpError('Product is not exist', 400);
  }

  res.send({
    status: 'success',
    data: listComment,
  });
};

module.exports = {
  createComment,
  getListCommentByProductId,
};
