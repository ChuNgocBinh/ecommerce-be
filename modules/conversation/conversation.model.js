const db = require('../../db/db_helper');

const getAll = async (id, skip, limit) => {
  try {
    const res = await db('conversation')
      .offset(skip)
      .limit(limit)
      .where('member_1', id)
      .orwhere('member_2', id);
    if (res.length) {
      return res;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  getAll,
};
