const express = require('express');
const authController = require('./auth.controller');

const router = express.Router();

router.post('/register/admin', authController.createUserAdmin);
router.post('/login/admin', authController.loginAdmin);
router.post('/register', authController.createUser);
router.post('/login', authController.login);
router.post('/exportUser', authController.exportUserCsv);

module.exports = router;
