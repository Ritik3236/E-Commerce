const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, isAuthAdmin } = require('../middleware/isAuth');

const { newOrder, getMyOrders, getSingleOrder,
    getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController')

router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/orders/me').get(isAuthenticatedUser, getMyOrders);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);

router.route('/admin/orders').get(isAuthenticatedUser, isAuthAdmin("admin"), getAllOrders)
router.route('/admin/order/:id')
    .put(isAuthenticatedUser, isAuthAdmin("admin"), updateOrder)
    .delete(isAuthenticatedUser, isAuthAdmin("admin"), deleteOrder);


module.exports = router;