const express = require('express');
const { isAuthenticatedUser, isAuthAdmin } = require('../middleware/isAuth');
const router = express.Router();
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getSingleUserDetails,
    updateUserRole, getUserDetails, updatePassword, updateProfile, getAllUserDetails,
    deleteUser } = require('../controllers/userController')

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser, getUserDetails);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/admin/users').get(isAuthenticatedUser, isAuthAdmin("admin"), getAllUserDetails);
router.route('/admin/user/:id')
    .get(isAuthenticatedUser, isAuthAdmin("admin"), getSingleUserDetails)
    .put(isAuthenticatedUser, isAuthAdmin("admin"), updateUserRole)
    .delete(isAuthenticatedUser, isAuthAdmin("admin"), deleteUser);

module.exports = router;
