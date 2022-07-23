const db = require('../../db/db_helper');

const createUserAdmin = async (data) => {
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

const getUserAdminByEmail = async (email) => {
  try {
    const result = await db('users_admin')
      .select('id', 'user_name ', 'email', 'rule', 'password')
      .where({
        email,
      });
    return result ? result[0] : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createUser = async (data) => {
  try {
    const result = await db.transaction(async (trx) => {
      const res = await trx('users').insert(data);
      console.log(res);
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
    const result = await db('users')
      .select('id', 'user_name ', 'email', 'password', 'phone_number', 'address', 'isActive')
      .where({
        email,
      });
    return result ? result[0] : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUserById = async (user_id) => {
  try {
    const result = await db('users')
      .select(
        'id',
        'user_name',
        'email',
        'phone_number',
        'address',
        'profile_picture',
      )
      .where('id', user_id);
    return result ? result[0] : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getlistUser = async () => {
  try {
    const result = await db('user')
      .stream();
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUserAdmin,
  getUserAdminByEmail,
  createUser,
  getUserByEmail,
  getUserById,
  getlistUser,
};
