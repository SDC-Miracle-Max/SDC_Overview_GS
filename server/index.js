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
});

//LIST PRODUCTS - GET /products 

//PRODUCT INFORMATION - GET /products/:product_id
const nestQuery = (query) => {
  return `coalesce((SELECT array_to_json(array_agg(row_to_json(x))) FROM (${query}) x ),'[]')`;
}

app.get('/products/:product_id', (req, res) => {
  const { product_id } = req.params;
  const sqlCommandFeatures = `SELECT * FROM features WHERE product_id=($1)`;
  const sqlCommand = `SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price, ${nestQuery(sqlCommandFeatures)} FROM products p WHERE id=($1)`;
  db.query(sqlCommand, [product_id])
    .then (data => res.send(data.rows[0]))
    .catch(console.log);
})


//PRODUCT STYLES - GET /products/:product_id/styles 
app.get('/products/:product_id/styles', (req, res) => {
  const { product_id } = req.params;
  const sqlCommandStyles_ProductId = 'SELECT product_id FROM styles WHERE product_id=($1)'
  db.query(sqlCommandStyles_ProductId, [product_id])
    .then(data => {
      const stylesInfo = data.rows[0]
      const sqlCommand_Styles = 'SELECT style_id, name, original_price, sale_price, "default?" FROM styles WHERE product_id=($1)';
      db.query(sqlCommand_Styles, [product_id])
        .then(data => {
          stylesInfo['results'] = data.rows;
          console.log('current style object: ', stylesInfo.results);
          for (var styleObj of stylesInfo.results) {
            // console.log(styleObj)
            const sqlCommand_photos = 'SELECT thumbnail_url, url FROM photos WHERE style_id=($1)';
            db.query(sqlCommand_photos, [styleObj.style_id])
              .then(data => {
                console.log(data.rows);
                styleObj['photos'] = data.rows;
              })
            
            // const sqlCommand_skus = 

            res.send(stylesInfo) //LEFT OFF HERE!!! need to add photos and skus
          }





        })
        .catch(err => console.error(err.stack));
    })
    .catch(err => console.error(err))


})






//RELATED PRODUCTS - GET /products/:product_id/related 



app.listen(port, () => {
  console.log(`SDC_Overview_GS server up and running at http://localhost:${port} :)`)
})