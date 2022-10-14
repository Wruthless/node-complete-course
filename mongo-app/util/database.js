const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    // Notice "shop" before the query string, this defines what the database name
    // will be in Mongo.
    MongoClient.connect('mongodb+srv://brandon:terminal@cluster0.btl9b9w.mongodb.net/shop?retryWrites=true&w=majority'
    )
    .then(client => {
        console.log("connected");
        _db = client.db();
        callback();
    })
    .catch(err =>  {
        console.log(err)
        throw err;
    });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;