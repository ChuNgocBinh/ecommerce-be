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

module.exports = {
  createShopAccount,
};
