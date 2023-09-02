const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config');
const db = {};

const sequelize = new Sequelize(dbConfig.DB , dbConfig.USER , dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    logging: false
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('./userModel')(sequelize, Sequelize);
db.barang = require('./bookModel')(sequelize, Sequelize);


module.exports = db;