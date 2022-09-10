const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

// add-product can be repeated since we are using 
// different methods -- GET, POST

/** IMPORTANT WE ADDED A FILTER TO THESE  IN 'app.js' **/
// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product'
    });
  });

// /admin/add-product => POST
router.post('/add-product', (req,res,next) => {
    products.push({
        title: req.body.title
    });
    res.redirect('/');
});

// changing `module.exports = routes` requires a change
exports.routes = router;
exports.products = products;
