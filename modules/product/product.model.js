const db = require('../../db/db_helper');

const createProductItem = async (data) => {
  try {
    const result = await db.transaction(async (trx) => {
      const res = await trx('product_item').insert(data);
      if (!res?.length) {
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

const getProductById = async (id) => {
  try {
    const result = await db('product_item').where('id', id);
    return result ? result[0] : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createProductItem,
  getProductById,
};
