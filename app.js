const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyPaser = require('body-parser')
const mongoose = require('mongoose')

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect('mongodb+srv://admin:g4uAdS9H2S3TqM3q@cluster0-7v9qx.mongodb.net/test?retryWrites=true')

app.use(morgan('dev'));
app.use(bodyPaser.urlencoded({extended: false}));
app.use(bodyPaser.json());

app.use((req, res, next) => 
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') 
    {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({

        })
    }
    next();
})

// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status(404);
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            massage: error.message
        }
    })
})

module.exports = app;