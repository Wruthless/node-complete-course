const db = require('../util/database');

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {

    }

    static deleteById(id) {

    }

    // Called in the 'shop.js' controller.
    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static findById(id) {

    }

};
