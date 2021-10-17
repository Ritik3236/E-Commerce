const express = require('express');
const { getAllProduct, getOneProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { isAuthenticatedUser, isAuthAdmin } = require('../middleware/isAuth');

const router = express.Router();

router.route('/products').get(getAllProduct);

router.route('/admin/product/new').post(isAuthenticatedUser, isAuthAdmin("admin"), createProduct);

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, isAuthAdmin("admin"), updateProduct)
    .delete(isAuthenticatedUser, isAuthAdmin("admin"), deleteProduct);

router.route('/product/:id').get(getOneProduct)

module.exports = router;