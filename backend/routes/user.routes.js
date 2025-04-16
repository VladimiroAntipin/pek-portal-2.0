const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJwt');
const userController = require('../controllers/user.controller');

router.get('/me', verifyToken, userController.userProfile);
router.get('/:id', verifyToken, userController.getUserById);

module.exports = router;