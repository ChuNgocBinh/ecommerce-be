const HttpError = require('../../common/httpError');
const { createShopAccount } = require('./shop_account.model');

const createShop = async (req, res, next) => {
  const { user } = req;
  console.log(req.file);
  console.log(req.body.cnb);
  // const bodyData = req.body;

  // if (!bodyData.shop_name
  //   || !bodyData.phone_number
  //   || !bodyData.profile_picture
  //   || !bodyData.email
  //   || !bodyData.country
  //   || !bodyData.province
  //   || !bodyData.city
  //   || !bodyData.zip_code
  // ) {
  //   throw new HttpError('Field can not blank', 400);
  // }

  // const data = {
  //   shop_name: bodyData.shop_name,
  //   user_id: user.id,
  //   profile_picture: bodyData.profile_picture,
  //   phone_number: bodyData.phone_number,
  //   email: bodyData.email,
  //   country: bodyData.country,
  //   province: bodyData.province,
  //   city: bodyData.city,
  //   zip_code: bodyData.zip_code,
  //   description: bodyData.description,
  //   shop_account_status: 0,
  // };

  // const isCreateShopAccount = await createShopAccount(data, bodyData.shop_id);
  // if (!isCreateShopAccount) {
  //   throw new HttpError('server error', 400);
  // }

  res.send({
    status: 'success',
  });
};

module.exports = {
  createShop,
};
