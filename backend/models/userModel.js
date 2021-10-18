const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Your Name'],
        maxLength: [30, `Can't be longer than 30 characters`],
        minLength: [4, " Name Should be at least 4 characters"]
    },
    email: {
        type: String,
        required: [true, 'Please Enter Your Email'],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, 'Please Enter Your Password'],
        minLength: [8, " Password Should be at least 8 characters"],
        select: false,
    },
    avatar: {
        publicId: {
            type: String,
            required: true,
        },
        imgUrl: {
            type: String,
            required: true,
        }
    },
    role: {
        type: String,
        default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

})

// password hashing
userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)

});

// generating JWT_TOKEN
userSchema.methods.getJWT_token = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// comparing Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)

};

// Generating Password reset token
userSchema.methods.getResetPasswordToken = async function () {

    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and adding to userSchema
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}


module.exports = mongoose.model('user', userSchema);