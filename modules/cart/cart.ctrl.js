const HttpError = require('../../common/httpError');
const cartModel = require('./cart.model');

const addCarts = async (req, res, next) => {
  const { user } = req;
  const bodyData = req.body;
  if (
    !bodyData.product_name
    || !bodyData.product_id
    || !bodyData.price
    || !bodyData.quantity
    || !bodyData.total
  ) {
    throw new HttpError('field can not blank', 400);
  }

  const newProduct = await cartModel.addCart({ user_id: user.id, ...bodyData });
  if (!newProduct) {
    throw new HttpError('Create product fail', 400);
  }

  res.send({
    status: 'success',
  });
};

const getAllCartByUserId = async (req, res, next) => {
  const { user } = req;
  // const { id } = req.params;

  const product = await cartModel.getListCart(user.id);
  if (!product) {
    throw new HttpError('Product is not exist', 400);
  }

  res.send({
    status: 'success',
    data: product,
  });
};

const getCartItem = async (req, res) => {
  const { id } = req.params;
  const item = await cartModel.getCartItem(id);
  if (!item) {
    throw new HttpError('Error');
  }
  res.send({
    status: 'success',
    data: item,
  });
}

const deleteCartById = async (req, res) => {
  const { id } = req.params;
  const deleted = await cartModel.deleteCard(id);
  if (!deleted) {
    throw new HttpError('Error');
  }
  res.send({
    status: 'success',
    data: deleted,
  });
};

const updateCartItem = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  console.log(data);
  const updated = await cartModel.updateCartItem(id, data);
  if (!updated) {
    throw new HttpError('Error');
  }
  res.send({
    status: 'success',
    data: updated,
  });
};

module.exports = {
  addCarts,
  getAllCartByUserId,
  deleteCartById,
  getCartItem,
  updateCartItem,
};
