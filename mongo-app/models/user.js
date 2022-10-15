const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email) {
        this.name = username;
        this.email = email;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
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