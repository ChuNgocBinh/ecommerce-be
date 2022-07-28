const HttpError = require('../../common/httpError');
const { uploadFile } = require('../../common/upload');
const db = require('../../db/db_helper');
const productModel = require('./product.model');

const createProduct = async (req, res, next) => {
  const { user } = req;
  const bodyData = req.body;
  if (
    !bodyData.product_name ||
    !bodyData.shop_id ||
    !bodyData.brand ||
    !bodyData.cost ||
    !bodyData.discount ||
    !bodyData.quantity
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

const getListProduct = async (req, res, next) => {
  const { user } = req;
  const result = await productModel.getListProduct();
  if (!result) {
    throw new HttpError('server error', 400);
  }
  res.send({
    status: 'success',
    data: result,
  });
};

const getListProductAcceptByShopId = async (req, res, next) => {
  const { user } = req;
  const { shop_user } = req;
  const result = await productModel.getListProductAcceptByShopId(shop_user.id);
  if (!result) {
    throw new HttpError('server error', 400);
  }
  res.send({
    status: 'success',
    data: result,
  });
};

const getListProductWaitingByShopId = async (req, res, next) => {
  const { user } = req;
  const { shop_user } = req;
  const result = await productModel.getListProductWaitingByShopId(shop_user.id);
  if (!result) {
    throw new HttpError('server error', 400);
  }
  res.send({
    status: 'success',
    data: result,
  });
};

const getListProductByShopId = async (req, res, next) => {
  const { shop_user } = req;
  const result = await productModel.getListProductByShopId(shop_user.id);
  if (!result) {
    throw new HttpError('server error', 400);
  }
  res.send({
    status: 'success',
    data: result,
  });
};

const deleteProduct = async (req, res, next) => {
  const { product_id } = req.params;
  const result = await productModel.deteleProductById(product_id);
  if (!result) {
    throw new HttpError('server error', 400);
  }
  res.send({
    status: 'success',
    data: result,
  });
};

const getListProductWaiting = async (req, res, next) => {
  const result = await productModel.getListProductsWaiting();
  if (!result) {
    throw new HttpError('server error', 400);
  }
  res.send({
    status: 'success',
    data: result,
  });
};

const getListProductsBySearch = async (req, res, next) => {
  try {
    const { search } = req.query;
    console.log(search);
    const result = await productModel.getListProductsBySearch(search);
    res.send({
      status: 'success',
      data: result
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { user } = req;
  const bodyData = req.body;
  const { product_id } = req.params;

  const newProduct = await productModel.updateProductItem(bodyData, product_id);
  if (!newProduct) {
    throw new HttpError('Create product fail', 400);
  }

  res.send({
    status: 'success',
  });
};

module.exports = {
  createProduct,
  getProductById,
  getListProduct,
  getListProductByShopId,
  deleteProduct,
  getListProductWaiting,
  getListProductsBySearch,
  getListProductAcceptByShopId,
  updateProduct,
  getListProductWaitingByShopId
};
