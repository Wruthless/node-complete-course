const path = require('path');
const express = require('express');

const productsController = require('../controllers/products')

const router = express.Router();


// add-product can be repeated since we are using 
// different methods -- GET, POST

/** IMPORTANT WE ADDED A FILTER TO THESE  IN 'app.js' **/
// /admin/add-product => GET
router.get('/add-product', productsController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);

// changing `module.exports = routes` requires a change
module.exports = router;