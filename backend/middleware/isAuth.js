const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {

    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Plz Login to Access This Feature"), 401)
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
});

exports.isAuthAdmin = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            next(new ErrorHandler("You are not allowed to access this Resource", 403))
        }
        next();
    }
}


