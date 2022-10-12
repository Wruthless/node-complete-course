const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.findAll()
    .then(products => {
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

        // findAll() return an array.
        Product.findAll({
            where: {
                id: prodId
            }
        })
        .then(products => {
            res.render('shop/product-detail', {
                product: products[0],            // id is the first entry in the array
                pageTitle: products[0].title,
                path: '/products'
            });
        })
        .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.findAll()
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
    req.user[0].getCart()
    .then(cart => {
        return cart.getProducts()
        .then(products => {
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};


exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    // Get access to the cart, same as in getCart
    req.user[0].getCart()
    .then(cart => {
        fetchedCart = cart;
        // Is the product you are adding already part of the cart?
        // If so, you will need to add to the quanity. If not,
        // it needs to be added to the cart with a quantity of 1.
        return cart.getProducts({
            where: {
                id: prodId
            }
        });
    })
    // An array of products is in this .then, but it will only hold 1 at most.
    // Because above, we are only getting one product based on he prodId.
    .then(products => {
        // Get the single product as the first element of the array
        let product;
        if (products.length > 0) {
            product = products[0];
        }

        // Check if product is anything but undefined
        if (product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            // product in the next .then statement.
            return product;
        }
        // New product case
        return Product.findAll({
            where: {
                id: prodId
            }
        })
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity }
            });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user[0]
        .getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: prodId }})
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}

exports.postOrder = (req,res,next) => {
    req.user[0]
        .getCart()
        .then(cart => {
            return cart.getProducts();
        })
        .then(products => {
            return req.user[0]
                .createOrder()
                .then(order => {
                    order.addProducts(
                        products.map(product => {
                        console.log(product);
                        product.orderItem = {quantity: product.cartItem.quantity};
                        return product;
                    }));
                })
                .catch(err => console.log(err))
        })
        // start here //
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
