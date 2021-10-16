const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logout, forgotPassword } = require('../controllers/userController')

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logout);
router.route('/password/forgot').post(forgotPassword);

module.exports = router;
