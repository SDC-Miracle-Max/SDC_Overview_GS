const POSTGRES_CONNECTION = require('./config.js');
const { Pool } = require('pg');
const pool = new Pool (POSTGRES_CONNECTION);


const checkConnection = function (callback) {
    pool.query('SELECT * FROM products WHERE product_id=1', callback);
}

const getProductInfo = function (product_id, callback) {
    const sqlCommand = 'SELECT * FROM products WHERE product_id=(?)';
    pool.query(sqlCommand, [product_id], callback);
}

const getProductStyles = function (product_id, callback) {
    // const sqlCommand = 'SELECT '
}

module.exports = {
    checkConnection, 
    getProductInfo
}
