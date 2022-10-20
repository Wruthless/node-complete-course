const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
        console.log(products);
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.find()
    .then(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
            const products = user.cart.items;
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                // what you are passing into your view
                products: products
            });
    })
    .catch(err => console.log(err));
};


exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
        // In the user model `addToCart()` expects a product. 
        // `addToCart()` calls the `updateOne()` method which returns a promise.
        /*
            .updateOne(
            {
                _id: new ObjectId(this._id) 
            },
            {
                $set: { cart: updatedCart }
            });
        */
       // Since the user model function returns a promise we can also return
       // here, inside the controller.
        req.user.addToCart(product)
    })
    // get the result of the update operation.
    .then(result => {
        res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .addOrder()
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};
