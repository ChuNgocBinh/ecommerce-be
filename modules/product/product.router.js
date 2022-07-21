const router = require('express').Router();
const isAuth = require('../../middleware/auth');
const productController = require('./product.ctrl');

router.post('/create', isAuth, productController.createProduct);
router.get('/:product_id', isAuth, productController.getProductById);

module.exports = router;
