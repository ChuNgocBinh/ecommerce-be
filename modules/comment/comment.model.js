const db = require('../../db/db_helper');

const createCommentItem = async (data) => {
  try {
    const result = await db.transaction(async (trx) => {
      const res = await trx('comment').insert(data);
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

const getListComment = async (id) => {
  try {
    const result = await db('comment').where('product_id', id);
    return result || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createCommentItem,
  getListComment,
};
