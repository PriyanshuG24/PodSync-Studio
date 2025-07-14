const express = require('express');
const router = express.Router();
const authController = require('../controllers/userControllers');
const verifyToken = require('../middlewares/verifyAccessToken');
// Auth routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/refresh-token', authController.refreshTokenApi);
router.post('/logout', authController.logout);
router.get('/current-user', verifyToken, authController.getCurrentUserDetails);

module.exports = router;