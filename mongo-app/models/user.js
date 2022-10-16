const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart; // {items: []}
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    // Cart functionality is defined in the user user model since there is a
    // 1:1 relationship between users and carts. This is opposed to having a
    // separate Cart model (cart.js).
    addToCart(product) {
        // Check if current item exists to avoid overwriting cart contents.
        const cartProductIndex = this.cart.items.findIndex(cp => {
            // The id from mongo is treated as a string in JS -- however, it is
            // not a string. Therefore, you need to convert the product id coming
            // from the database to a string and compare it to a string. If
            // you are using the triple equality operator which test not only for
            // value, but also type.
            return cp.productId.toString() === product._id.toString();
        });

        let newQuantity = 1;

        // A new array with all items in the cart
        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            // If the item exist, update quantity
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            // If the item does not exist, add the item tot he cart
            updatedCartItems.push({
                productId: new ObjectId(product._id),
                quantity: newQuantity
            });
        }
        /*
            The following will store all product data, which we do not want.
            Notice the spread syntax is being used on product -- ...product

            const updatedCart = { items: [{ ...product, quantity: 1 }] }; 
        */
        const updatedCart = {
            items: updatedCartItems
        };
        const db = getDb();

        return db.collection('users').updateOne(
            { _id: new ObjectId(this._id) },
            { $set: {cart: updatedCart}}
        );
    }

    getCart() {
        const db = getDb();
        // get all the products in the cart utilizing the special mongo
        // query syntax. Find all products where _id is equal to $in.
        // It takes an array of ids and every id in the array will be accepted
        // which will get a cursor which holds references to all products with 
        // the id mentioned in the array.

        // map an array of items if just product ids.
        const productIds = this.cart.items.map(i => {
            return i.productId;
        });

        return db
            .collection('products')
            .find({
            // get a cursor with all matching products.
            _id: { $in: productIds }
        })
        .toArray()
        .then(products => {
            // adding a quantity attribute on the cart which we get from the
            // the existing products.
            return products.map(p => {
                return {...p, quantity: this.cart.items.find(i => {
                    return i.productId.toString() === p._id.toString();
                    }).quantity
                };
            });
        });
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users').findOne({
            _id: new ObjectId(userId)
        });
        // Next would be needed if used just find, since it returns a cursor.
        // However, since we are only using one user, `findOne()` is used 
        // which just returns a singular user. There is no need for `.next()`.
        // .next();
    }
}

module.exports = User;