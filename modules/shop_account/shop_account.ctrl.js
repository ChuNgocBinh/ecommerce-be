const HttpError = require('../../common/httpError');
const { uploadFile } = require('../../common/upload');
const db = require('../../db/db_helper');
const { createShopAccount, updateShopAccount, getShopAccountByUserId } = require('./shop_account.model');

const createShop = async (req, res, next) => {
  const { user, file } = req;
  const bodyData = JSON.parse(req.body.data);

  if (
    !bodyData.shop_name
    || !bodyData.phone_number
    || !bodyData.email
    || !bodyData.country
    || !bodyData.province
    || !bodyData.city
    || !bodyData.zip_code
    || !file
  ) {
    throw new HttpError('Field can not blank', 400);
  }

  const url = await uploadFile(file);
  const data = {
    ...bodyData,
    profile_picture: url.Location,
    user_id: user.id,
  };

  const isCreateShopAccount = await createShopAccount(data, bodyData.shop_id);
  if (!isCreateShopAccount) {
    throw new HttpError('server error', 400);
  }

  res.send({
    status: 'success',
  });
};

const updateShop = async (req, res, next) => {
  try {
    const { shop_id, data } = req.body;
    const result = await updateShopAccount(shop_id, data);
    if (!result) {
      throw new HttpError('server error', 400);
    }
    res.send({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    throw new HttpError('server error', 400);
  }
};

const getShopById = async (req, res, next) => {
  try {
    const { user } = req;
    const result = await getShopAccountByUserId(user.id);
    if (!result) {
      throw new HttpError('server error', 400);
    }
    res.send({
      status: 'success',
      data: result,
    });
  } catch (error) {
    console.log(error);
    throw new HttpError('server error', 400);
  }
};

module.exports = {
  createShop,
  updateShop,
  getShopById,
};
