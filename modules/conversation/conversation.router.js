const express = require('express');
const isAuth = require('../../middleware/auth');
const conversationController = require('./conversation.controller');

const router = express.Router();

router.get('/', isAuth, conversationController.getListConversation);

module.exports = router;
