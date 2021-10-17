const express = require('express');
const { isAuthenticatedUser, isAuthAdmin } = require('../middleware/isAuth');
const router = express.Router();
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getSingleUserDetails,
    getUserDetails, updatePassword, updateProfile, getAllUserDetails } = require('../controllers/userController')

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser, getUserDetails);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/admin/users').get(isAuthenticatedUser, isAuthAdmin("admin"), getAllUserDetails);
router.route('/admin/user/:id').get(isAuthenticatedUser, isAuthAdmin("admin"), getSingleUserDetails);

module.exports = router;
