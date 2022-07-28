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
      .leftJoin('shop_accounts', 'shop_accounts.user_id', 'users.id')
      .select(
        'users.id',
        'users.user_name',
        'users.email',
        'users.phone_number',
        'users.address',
        'users.profile_picture',
        'shop_accounts.id as shop_id',
        'shop_accounts.shop_name',
        'shop_accounts.shop_account_status'
      )
      .where('users.id', user_id);
    return result ? result[0] : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const toggleLockUser = async (data, id) => {
  try {
    const result = await db.transaction(async (trx) => {
      const res = await trx('users')
        .where('id', id)
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

const deleteUser = async (id) => {
  try {
    const result = await db('users').where('id', id).delete();
    return result || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUserAdminById = async (user_id) => {
  try {
    const result = await db('users_admin')
      .select(
        'id',
        'user_name',
        'email',
      )
      .where('id', user_id);
    return result ? result[0] : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getListUser = async () => {
  try {
    const result = await db('users')
      .select(
        'id',
        'user_name',
        'email',
        'phone_number',
        'isActive'
      );
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateUserInfo = async (id, data) => {
  try {
    const result = await db.transaction(async (trx) => {
      const res = await trx('users')
        .where('id', id)
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

module.exports = {
  createUserAdmin,
  getUserAdminByEmail,
  createUser,
  getUserByEmail,
  getUserById,
  getListUser,
  getUserAdminById,
  toggleLockUser,
  deleteUser,
  updateUserInfo
};
