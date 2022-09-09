const path = require('path')
const express = require('express');

const rootDir = require('../util/path');
// To pull in data
const adminData = require('./admin')

const router = express.Router();

router.get('/', (req, res, next) => {
    // `__dirname` is a global variable from the OS that hold the path to this file
    // (routes) works on all operating systems.

    // Changed to using rootDir in the util directory.
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    // console.log('shop.js', adminData.products);

    const products = adminData.products;
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
    });
});

module.exports = router;