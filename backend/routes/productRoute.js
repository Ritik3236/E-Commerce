const express = require('express');
const { getAllProduct, getOneProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { isAuthenticatedUser, isAuthAdmin } = require('../middleware/isAuth');

const router = express.Router();

router.route('/products')
    .get(isAuthenticatedUser, isAuthAdmin("admin"), getAllProduct);

router.route('/product/new')
    .post(isAuthenticatedUser, isAuthAdmin("admin"), createProduct);

router.route('/product/:id')
    .get(getOneProduct)
    .put(isAuthenticatedUser, isAuthAdmin("admin"), updateProduct)
    .delete(isAuthenticatedUser, isAuthAdmin("admin"), deleteProduct);



module.exports = router;