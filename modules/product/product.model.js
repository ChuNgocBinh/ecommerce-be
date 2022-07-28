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

const getListProduct = async () => {
  try {
    const result = await db('product_item')
      .leftJoin('shop_accounts', 'shop_accounts.id', 'product_item.shop_id')
      .select(
        'product_item.id',
        'product_item.product_name',
        'product_item.shop_id',
        'product_item.brand',
        'product_item.cost',
        'product_item.discount',
        'product_item.quantity',
        'product_item.picture_url',
        'shop_accounts.shop_name'
      )
      .where('product_item.isAccept', 1);
    return result || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getListProductAcceptByShopId = async (shop_id) => {
  try {
    const result = await db('product_item')
      .leftJoin('shop_accounts', 'shop_accounts.id', 'product_item.shop_id')
      .select(
        'product_item.id',
        'product_item.product_name',
        'product_item.shop_id',
        'product_item.brand',
        'product_item.cost',
        'product_item.discount',
        'product_item.quantity',
        'product_item.picture_url',
        'shop_accounts.shop_name'
      )
      .where('product_item.isAccept', 1)
      .where('product_item.shop_id', shop_id);
    return result || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getListProductWaitingByShopId = async (shop_id) => {
  try {
    const result = await db('product_item')
      .leftJoin('shop_accounts', 'shop_accounts.id', 'product_item.shop_id')
      .select(
        'product_item.id',
        'product_item.product_name',
        'product_item.shop_id',
        'product_item.brand',
        'product_item.cost',
        'product_item.discount',
        'product_item.quantity',
        'product_item.picture_url',
        'shop_accounts.shop_name'
      )
      .where('product_item.isAccept', 0)
      .where('product_item.shop_id', shop_id);
    return result || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getListProductByShopId = async (id) => {
  try {
    const result = await db('product_item')
      .select(
        'id',
        'brand',
        'cost',
        'description',
        'detail',
        'discount',
        'isAccept',
        'picture_url',
        'product_name',
        'quantity'
      )
      .where('shop_id', id);
    return result || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deteleProductById = async (id) => {
  try {
    const result = await db('product_item').where('id', id).del();
    return result || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getListProductsWaiting = async (id) => {
  try {
    const result = await db('product_item')
      .leftJoin('shop_accounts', 'shop_accounts.id', 'product_item.shop_id')
      .select(
        'product_item.id',
        'product_item.product_name',
        'product_item.brand',
        'product_item.cost',
        'product_item.discount',
        'product_item.quantity',
        'shop_accounts.shop_name',
      )
      .where('isAccept', 0);
    return result || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getListProductsBySearch = async (text) => {
  try {
    const result = await db('product_item')
      .select(
        'id',
        'product_name',
        'brand',
        'cost',
        'discount',
      )
      .whereLike('product_name', `%${text}%`);
    return result || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateProductItem = async (data, product_id) => {
  try {
    const result = await db.transaction(async (trx) => {
      const res = await trx('product_item')
        .where('id', product_id)
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
  createProductItem,
  getProductById,
  getListProduct,
  getListProductByShopId,
  deteleProductById,
  getListProductsWaiting,
  getListProductsBySearch,
  getListProductAcceptByShopId,
  updateProductItem,
  getListProductWaitingByShopId
};
