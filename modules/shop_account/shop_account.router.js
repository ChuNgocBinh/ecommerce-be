const router = require('express').Router();
const { upload } = require('../../common/upload');
const isAuth = require('../../middleware/auth');
const shopAccountCtrl = require('./shop_account.ctrl');

router.post('/create', isAuth, upload.single('file'), shopAccountCtrl.createShop);
router.post('/update', isAuth, shopAccountCtrl.updateShop);
router.get('/my-shop', isAuth, shopAccountCtrl.getShopById);

module.exports = router;
