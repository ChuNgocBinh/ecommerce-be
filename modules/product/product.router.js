const router = require('express').Router();
const isAuth = require('../../middleware/auth');
const isShop = require('../../middleware/isShop');
const productController = require('./product.ctrl');

router.post('/create', isAuth, productController.createProduct);
router.get('/item/:product_id', isAuth, productController.getProductById);
router.get('/list-product', isAuth, productController.getListProduct);
router.get(
  '/list-my-products',
  isAuth,
  isShop,
  productController.getListProductByShopId
);
router.get(
  '/list-my-products-waiting',
  isAuth,
  isShop,
  productController.getListProductWaitingByShopId
);
router.delete('/delete/:product_id', isAuth, productController.deleteProduct);
router.get('/list-product-waiting', isAuth, productController.getListProductWaiting);
router.get('/list-my-products-accept', isAuth, isShop, productController.getListProductAcceptByShopId);
router.get('/search', isAuth, productController.getListProductsBySearch);
router.post('/update-product/:product_id', isAuth, productController.updateProduct);

module.exports = router;
