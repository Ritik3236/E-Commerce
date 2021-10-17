const User = require('../models/userModel');
const crypto = require('crypto');
const sendToken = require('../utils/jwtToken');
const ErrorHandler = require('../utils/errorHandler');
const sendEmail = require('../utils/sendEmail')
const catchAsyncError = require('../middleware/catchAsyncError');


// Register User
exports.registerUser = catchAsyncError(async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password, avatar: {
            publicId: 'This sample public_url',
            imgUrl: "This is sample imgUrl"
        }
    });

    sendToken(user, 201, res)
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password"), 400);
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password"), 401);
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password"), 401)
    }

    sendToken(user, 201, res)
});


//logout User
exports.logout = catchAsyncError(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({ success: true, message: "logged Out Successfully" });
})

//forgot user password step  - I
exports.forgotPassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("No User Found"), 404);
    }

    //getResetPasswordToken
    const resetToken = await user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} 
    \n\nIf you have not requested this email then plz Ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message: message
        });
        res.status(200).json({ success: true, message: `Email sent to ${user.email} successfully` })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message), 500);
    }
});

// reset Password step - II
exports.resetPassword = catchAsyncError(async (req, res, next) => {

    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired."), 400);
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password doesn't Match."), 400);
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)
});

// getUser detail

exports.getUserDetails = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id)

    res.status(200).json({ success: true, user })

});

// Update User Password Using old Password

exports.updatePassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password doesn't Match."), 400)
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password doesn't Match", 400))
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 201, res)

});


// Update User Password Using old Password
exports.updateProfile = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    // We will add cloudanery Later

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({ success: true });

})

// get all User detail  {Admin}

exports.getAllUserDetails = catchAsyncError(async (req, res, next) => {

    const users = await User.find()

    res.status(200).json({ success: true, users })

});
// get Single User detail  {Admin}

exports.getSingleUserDetails = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User Doesn't exist with Id : ${req.params.id}`))
    }

    res.status(200).json({ success: true, user })

});
