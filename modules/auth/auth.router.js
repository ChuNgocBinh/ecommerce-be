const express = require('express');
const { upload } = require('../../common/upload');
const isAuth = require('../../middleware/auth');
const authController = require('./auth.controller');

const router = express.Router();

/**
 * @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 */

/**
 * @swagger
 *  /api/auth/me:
 *  get:
 *    summary: Returns a me info.
 *    description: Optional extended description in CommonMark or HTML.
 *    tags:
 *      - auth
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: A JSON array of user names
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 */

/**
 * @swagger
 *  /api/auth/login:
 *  post:
 *    summary: Returns status login.
 *    description: Optional extended description in CommonMark or HTML.
 *    tags:
 *      - auth
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: A JSON array of user names
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *            properties:
 *              status:
 *                type: boolean
 *              data:
 *                type: object
 */

router.post('/register/admin', authController.createUserAdmin);

router.post('/login/admin', authController.loginAdmin);
router.post('/register', authController.createUser);
router.post('/login', authController.login);
router.post('/update-user', isAuth, authController.updateUser);
router.get('/me', isAuth, authController.getMe);
router.get('/me-admin', isAuth, authController.getMeAdmin);
router.get('/list-user', isAuth, authController.getListUser);

/**
 * @swagger
 *  /api/auth/list-user/{id}:
 *  get:
 *    summary: Returns a me info.
 *    description: Optional extended description in CommonMark or HTML.
 *    tags:
 *      - auth
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id   # Note the name is the same as in the path
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description: The user ID
 *    responses:
 *      200:
 *        description: A JSON array of user names
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 */
router.get('/list-user/:id', isAuth, authController.getUserById);
router.post('/update-user/:id', isAuth, authController.updateLockUser);
router.post('/delete-user/:id', isAuth, authController.deleteUserById);
router.post('/login-gg-sso', authController.loginGoogleSSO);
router.post('/refresh-token', authController.refreshToken);
router.post('/upload-avatar', isAuth, upload.single('file'), authController.uploadAvatar);
router.post('/check-field-exist', isAuth, authController.checkFieldExist);
router.post('/change-email-profile', isAuth, authController.changeEmailProfile);
module.exports = router;
