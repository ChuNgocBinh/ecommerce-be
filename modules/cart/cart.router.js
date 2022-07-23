const router = require('express').Router();
const isAuth = require('../../middleware/auth');
const cartController = require('./cart.ctrl');

router.post('/addCart', isAuth, cartController.addCarts);
router.get('/allCartById', isAuth, cartController.getAllCartByUserId);
router.post('/deleteCartById/:id', isAuth, cartController.deleteCartById);
router.get('/cartItem/:id', isAuth, cartController.getCartItem);
router.post('/updateCartItem/:id', isAuth, cartController.updateCartItem);

module.exports = router;