const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'terminal', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;