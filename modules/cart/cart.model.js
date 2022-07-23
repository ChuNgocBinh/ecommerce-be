const db = require('../../db/db_helper');

const addCart = async (data) => {
  try {
    const result = await db.transaction(async (trx) => {
      const res = await trx('cart').insert(data);
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

const getListCart = async (id) => {
  try {
    const result = await db('cart').where('user_id', id);
    return result || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getCartItem = async (id) => {
  try {
    const result = await db('cart').where('id', id);
    return result || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteCard = async (id) => {
  try {
    const result = await db('cart').where('id', id).delete();
    return result || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateCartItem = async (id, data) => {
  try {
    const result = await db('cart').where('id', id).update(data);
    return result || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  addCart,
  getListCart,
  deleteCard,
  getCartItem,
  updateCartItem,
};