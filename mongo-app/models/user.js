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
        // const cartProduct = this.cart.items.findIndex(cp => {
        //     return cp._id === product._id;
        // });
        const updatedCart = { items: [{ ...product, quantity: 1 }] };
        const db = getDb();

        return db.collection('users').updateOne(
            { _id: new ObjectId(this._id) },
            { $set: {cart: updatedCart}}
        );
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