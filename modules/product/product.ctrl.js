const HttpError = require('../../common/httpError');
const { uploadFile } = require('../../common/upload');
const db = require('../../db/db_helper');
const productModel = require('./product.model');

const createProduct = async (req, res, next) => {
  const { user } = req;
  const bodyData = req.body;
  if (
    !bodyData.product_name
    || !bodyData.shop_id
    || !bodyData.brand
    || !bodyData.cost
    || !bodyData.discount
    || !bodyData.quantity
  ) {
    throw new HttpError('field can not blank', 400);
  }

  const newProduct = await productModel.createProductItem(bodyData);
  if (!newProduct) {
    throw new HttpError('Create product fail', 400);
  }

  res.send({
    status: 'success',
  });
};

const getProductById = async (req, res, next) => {
  const { user } = req;
  const { product_id } = req.params;

  const product = await productModel.getProductById(product_id);
  if (!product) {
    throw new HttpError('Product is not exist', 400);
  }

  res.send({
    status: 'success',
    data: product,
  });
};

module.exports = {
  createProduct,
  getProductById,
};
