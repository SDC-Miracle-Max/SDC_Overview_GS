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
  db.checkConnection((err, data) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.send(data.rows[0]);
    }
  });
});

//LIST PRODUCTS - GET /products 

//PRODUCT INFORMATION - GET /products/:product_id
app.get('/products/:product_id', (req, res) => {
  const { product_id } = req.params;
  db.getProductInfo(product_id, (err, data) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      const productInfo = data.rows[0];
      console.log('productInfo: ', productInfo);
      db.getProductFeaturesInfo(product_id, (err, data) => {
        if (err) {
          console.log(err);
          res.send(500);
        } else {
          const featuresInfo = data.rows[0];
          console.log('featuresInfo: ', featuresInfo)
        }
      })

      res.send(productInfo);
    }
  })
})

//PRODUCT STYLES - GET /products/:product_id/styles 
app.get('/products/:product_id/styles', (req, res) => {
  const { product_id } = req.params;

  db.getProductStylesInfo(product_id, (err, data) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      console.log(data.rows[0]);``
      res.send(data.rows[0]);
    }
  })


})

//RELATED PRODUCTS - GET /products/:product_id/related 



app.listen(port, () => {
  console.log(`SDC_Overview_GS server up and running at http://localhost:${port} :)`)
})