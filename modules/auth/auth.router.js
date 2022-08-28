const express = require('express');
const isAuth = require('../../middleware/auth');
const authController = require('./auth.controller');

const router = express.Router();

router.post('/register/admin', authController.createUserAdmin);

router.post('/login/admin', authController.loginAdmin);
router.post('/register', authController.createUser);
router.post('/login', authController.login);
router.post('/update-user', isAuth, authController.updateUser);
router.get('/me', isAuth, authController.getMe);
router.get('/me-admin', isAuth, authController.getMeAdmin);
router.get('/list-user', isAuth, authController.getListUser);
router.get('/list-user/:id', isAuth, authController.getUserById);
router.post('/update-user/:id', isAuth, authController.updateLockUser);
router.post('/delete-user/:id', isAuth, authController.deleteUserById);
router.get('/recapcha', authController.recapcha);

module.exports = router;
