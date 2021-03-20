const POSTGRES_CONNECTION = require('./config.js');
const { Pool } = require('pg');
const pool = new Pool (POSTGRES_CONNECTION);

pool.query('SELECT NOW()')
  .then(res => console.log('Connected to Postgres at ', res.rows[0].now))
  .catch(e => console.error(e.stack))




const getProductFeaturesInfo = function (product_id, callback) {
    const sqlCommand = 'SELECT * FROM features WHERE product_id=($1)';
    pool.query(sqlCommand, [product_id], callback);
}

// module.exports = {
//     // checkConnection, 
//     // getProductInfo, 
//     // getProductFeaturesInfo
    
// }

module.exports = pool;
