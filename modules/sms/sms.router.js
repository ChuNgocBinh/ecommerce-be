const router = require('express').Router();
const smsController = require('./sms.controller');

router.post('/get-code-sms', smsController.getCodeSms);
router.post('/verify-code-sms', smsController.verifyCodeSms);

module.exports = router;
