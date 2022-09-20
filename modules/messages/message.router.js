const express = require('express');
const isAuth = require('../../middleware/auth');
const messageController = require('./message.controller');

const router = express.Router();

router.get('/:cvs_id', isAuth, messageController.getMessagesByconversationId);
router.post('/create-message/:cvs_id', isAuth, messageController.createMessage);

module.exports = router;
