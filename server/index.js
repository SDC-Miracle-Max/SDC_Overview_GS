const express = require('express')
const morgan = require('morgan');
const db = require ('../db/index.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('dev'));

//Check connection to database
app.get('/products', (req, res) => {
  //query to db
  db.query('SELECT * FROM products')
    .then(data => {
      // console.log(data.rows[0]); 
      res.send(200)
    })
    .catch(e => {
      res.send(500);
      console.error(e.stack)
    })
  // db.checkConnection(
  //   (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     res.send(500);
  //   } else {
  //     res.send(data.rows[0]);
  //   }
  // }
  // );
});

//LIST PRODUCTS - GET /products 

//PRODUCT INFORMATION - GET /products/:product_id
app.get('/products/:product_id', (req, res) => {
  const { product_id } = req.params;
  const sqlCommand = 'SELECT * FROM products WHERE id=($1)';
  db.query(sqlCommand, [product_id])
    .then(data => {
      const productInfo = data.rows[0];
      const sqlCommand = 'SELECT feature, value FROM features WHERE product_id=($1)';
      db.query(sqlCommand, [product_id])
        .then (data => {
          productInfo['features'] = data.rows;
          res.send(productInfo);
        })
        .catch(err => {console.error(err)}) //HERE IS WHERE WE CAN TO TAKE A LOOK FOR CASES WHERE PRODUCTS DO NOT HAVE FEATURES
    })
    .catch(err => {res.send(500); console.error(err)})
})

//PRODUCT STYLES - GET /products/:product_id/styles 
app.get('/products/:product_id/styles', (req, res) => {
  const { product_id } = req.params;
  const sqlCommand = 'SELECT product_id FROM styles WHERE product_id=($1)'
  db.query(sqlCommand, [product_id])
    .then(data => {
      const stylesInfo = data.rows[0]
      const sqlCommand = 'SELECT style_id, name, original_price, sale_price, "default?" FROM styles WHERE product_id=($1)';
      db.query(sqlCommand, [product_id])
        .then(data => {
          console.log(data.rows);
          stylesInfo['results'] = data.rows;
          res.send(stylesInfo) //LEFT OFF HERE!!! need to add photos and skus
        })
        .catch(err => console.error(err.stack));
    })
    .catch(err => console.error(err))


})

//RELATED PRODUCTS - GET /products/:product_id/related 



app.listen(port, () => {
  console.log(`SDC_Overview_GS server up and running at http://localhost:${port} :)`)
})