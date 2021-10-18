const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');

// Create new Order
exports.newOrder = catchAsyncError(async (req, res, next) => {

    const { shippingInfo, orderItems, paymentInfo,
        itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice,
        shippingPrice, totalPrice, paidAt: Date.now(), user: req.user
    });

    res.status(201).json({ success: true, order })
});

// get single order detail 
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("No order found with id: " + req.params.id, 404))
    }

    res.status(200).json({ success: true, order })
})

// get my all order detail by user
exports.getMyOrders = catchAsyncError(async (req, res, next) => {

    const orders = await Order.find({ user: req.user._id })

    if (!orders) {
        return next(new ErrorHandler("No order found", 404))
    }

    res.status(200).json({ success: true, orders })
})

// get all order detail by {admin}
exports.getAllOrders = catchAsyncError(async (req, res, next) => {

    const orders = await Order.find()

    if (!orders) {
        return next(new ErrorHandler("No order found", 404))
    }

    let totalAmount = 0

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({ success: true, totalAmount, orders })
})

// update order status by {admin}
exports.updateOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler("No order found", 404))
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 404))
    }

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (orderItem) => {
            await updateStock(orderItem.product, orderItem.quantity)
        });
    }


    order.orderStatus = req.body.status;


    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now()
    }

    await order.save({ validateBeforeSave: false })

    res.status(200).json({ success: true, order });
});

async function updateStock(id, quantity) {

    const product = await Product.findById(id);
    product.stock -= quantity;

    await product.save({ validateBeforeSave: false })
};


// delete order by {admin}
exports.deleteOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler("No order found", 404))
    }

    await order.remove()

    res.status(200).json({ success: true })
})