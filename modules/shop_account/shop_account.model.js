const db = require('../../db/db_helper');

const createShopAccount = async (data, shop_id) => {
  try {
    const result = await db.transaction(async (trx) => {
      if (!shop_id) {
        const res = await trx('shop_accounts').insert(data);
        if (!res?.length) {
          return false;
        }
      } else {
        const res = await trx('shop_accounts').update(data).where('id', shop_id);
        if (!res) {
          return false;
        }
      }

      return true;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateShopAccount = async (shop_id, data) => {
  try {
    const result = await db.transaction(async (trx) => {
      const res = await trx('shop_accounts')
        .where({
          id: shop_id,
        })
        .update(data);

      if (!res) {
        return false;
      }
      return true;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getShopAccountByUserId = async (user_id) => {
  try {
    const result = await db('shop_accounts')
      .where('user_id', user_id);
    return result ? result[0] : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createShopAccount,
  updateShopAccount,
  getShopAccountByUserId,
};
