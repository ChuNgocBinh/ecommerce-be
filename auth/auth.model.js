const db = require('../db/db_helper');

const createUser = async (data) => {
  try {
    const result = db.transaction(async (trx) => {
      const res = await trx('users_admin').insert(data);
      if (res.length) {
        return true;
      }
      return false;
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getUserByEmail = async (email) => {
  try {
    const result = db('users_admin')
      .select('id', 'user_name ', 'email', 'rule')
      .where({
        email,
      });
    return result ? result[0] : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createUser,
  getUserByEmail,
};
