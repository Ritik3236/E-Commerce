const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();

const errorMiddleware = require('./middleware/error')

app.use(express.json());
app.use(cookieParser());

// *** Route Import
const product = require('../backend/routes/productRoute')
const user = require('../backend/routes/userRoute')

app.use("/api/v1", product);
app.use("/api/v1", user);

// Middleware for Error

app.use(errorMiddleware)




module.exports = app
