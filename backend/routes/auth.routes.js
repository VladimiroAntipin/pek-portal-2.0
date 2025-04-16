const express = require('express');
const router = express.Router();
const { checkDuplicateEmail } = require('../middlewares/verifySignup');
const authController = require('../controllers/auth.controller');

router.post('/signup', checkDuplicateEmail, authController.signUp);
router.post('/signin', authController.signIn);
router.post('/refresh-token', authController.refreshToken);
router.post('/signout', authController.signOut);

module.exports = router;