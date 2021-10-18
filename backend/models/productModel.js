const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please Enter Product Name'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please Enter ProductDescription'],
    },
    price: {
        type: Number,
        required: [true, 'Please Enter Product Price'],
        maxLength: [8, "Price can't exceed 8 characters"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [{
        publicId: {
            type: String,
            required: true,
        },
        imgUrl: {
            type: String,
            required: true,
        }
    }],
    category: {
        type: String,
        required: [true, 'Please Enter Product Category']
    },

    stock: {
        type: Number,
        required: [true, 'Please Enter Product Stock'],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        comment: {
            type: String,
            required: true
        }
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model('Product', productSchema);