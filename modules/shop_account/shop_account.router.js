const router = require('express').Router();
const { upload } = require('../../common/upload');
const isAuth = require('../../middleware/auth');
const shopAccountCtrl = require('./shop_account.ctrl');

router.post('/create', isAuth, upload.single('avatar'), shopAccountCtrl.createShop);

module.exports = router;
