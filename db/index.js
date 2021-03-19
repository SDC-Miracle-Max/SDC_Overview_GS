const POSTGRES_CONNECTION = require('./config.js');
const { Pool } = require('pg');
const pool = new Pool (POSTGRES_CONNECTION);


const checkConnection = function (callback) {
    //  connection.query(sqlCommand, callback);

    pool.query('SELECT * FROM products WHERE product_id=1', callback);
}

module.exports = {
    checkConnection
}