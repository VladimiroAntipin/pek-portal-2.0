const express = require('express');
const router = express.Router();
const { register, login, logout, getUser, userProfile } = require('../controllers/auth');
const { isAuthenticated } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/myprofile', isAuthenticated, userProfile);
router.get('/logout', logout);
router.get('/user/:id', getUser);

module.exports = router;