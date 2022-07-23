const router = require('express').Router();
const isAuth = require('../../middleware/auth');
const commentController = require('./comment.ctrl');

router.post('/create', isAuth, commentController.createComment);
router.get('/:product_id', isAuth, commentController.getListCommentByProductId);

module.exports = router;
