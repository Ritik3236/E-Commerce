const express = require('express');
const { isAuthenticatedUser, isAuthAdmin } = require('../middleware/isAuth');

const { getAllProduct, getOneProduct, createProduct, updateProduct, deleteProduct,
    createProductReview, getProductReviews, deleteProductReview } = require('../controllers/productController');


const router = express.Router();

router.route('/products').get(getAllProduct);

router.route('/admin/product/new').post(isAuthenticatedUser, isAuthAdmin("admin"), createProduct);

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, isAuthAdmin("admin"), updateProduct)
    .delete(isAuthenticatedUser, isAuthAdmin("admin"), deleteProduct);

router.route('/product/review')
    .get(getProductReviews)
    .put(isAuthenticatedUser, createProductReview)
    .delete(isAuthenticatedUser, deleteProductReview)
    
router.route('/product/:id').get(getOneProduct)
// router.route('/product/review').delete(isAuthenticatedUser,)

module.exports = router;