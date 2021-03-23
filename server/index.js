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

const nestQuery = (query) => {
  return `coalesce((SELECT array_to_json(array_agg(row_to_json(x))) FROM (${query}) x ),'[]')`;
}

//PRODUCT INFORMATION - GET /products/:product_id
app.get('/products/:product_id', (req, res) => {
  const { product_id } = req.params;
  const sqlCommandFeatures = `SELECT * FROM features WHERE product_id=($1)`;
  const sqlCommand = `SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price, ${nestQuery(sqlCommandFeatures)} AS features FROM products p WHERE id=($1)`;
  db.query(sqlCommand, [product_id])
    .then (data => res.send(data.rows[0]))
    .catch(console.log);
})

app.get('/products/:product_id/styles', (req, res) => {
  const { product_id } =  req.params;
  const skusQuery = `( SELECT json_object_agg(sk.skus_id, (SELECT row_to_json(x) FROM (SELECT quantity, size FROM skus WHERE skus_id=sk.skus_id)x)) AS skus FROM skus sk WHERE sk.style_id=s.style_id)`;
  const photosQuery = nestQuery(`SELECT ph.url, ph.thumbnail_url FROM photos ph WHERE ph.style_id=s.style_id`);
  const resultsQuery = nestQuery(`SELECT *, ${photosQuery} AS photos, ${skusQuery} FROM styles s WHERE s.product_id=p.id`);
  const command =`SELECT id AS product_id, ${resultsQuery} AS results FROM products p WHERE id=($1);`;
  db.query(command, [product_id])
    .then(data => res.send(data.rows[0]))
    .catch(err => {
      console.log(err);
      res.send(500);
    });
  })
  
//RELATED PRODUCTS - GET /products/:product_id/related 
app.get('/products/:product_id/related', (req, res) => {
  const { product_id } = req.params;
  const sqlCommand =  `SELECT related_product_id FROM related WHERE current_product_id=($1)`;
  db.query(sqlCommand, [product_id])
    .then(data => {
      const result = [];
      data.rows.map (dataObj => {
        result.push(dataObj.related_product_id)
      })
      res.send(result)})
    .catch(err => {
      console.log(err);
      res.send(500);
    })
})


app.listen(port, () => {
  console.log(`SDC_Overview_GS server up and running at http://localhost:${port} :)`)
})