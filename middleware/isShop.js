const {
  getShopAccountByUserId,
} = require('../modules/shop_account/shop_account.model');

const isShop = async (req, res, next) => {
  try {
    const { user } = req;
    const shop = await getShopAccountByUserId(user.id);
    req.shop_user = shop;

    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = isShop;
