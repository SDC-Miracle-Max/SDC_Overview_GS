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
  const sqlCommand = `SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price, ${nestQuery(sqlCommandFeatures)} AS features FROM products p WHERE id=($1)`;

  db.query(sqlCommand, [product_id])
    .then (data => res.send(data.rows[0]))
    .catch(console.log);
})

app.get('/products/:product_id/styles', (req, res) => {
  const { product_id } = req.params;
  const sqlCommandStyles = `SELECT style_id, name, original_price, sale_price, "default?" FROM styles WHERE product_id=($1)`
  const sqlCommand =`SELECT id AS product_id, ${nestQuery(sqlCommandStyles)} AS results FROM products WHERE id=($1)`;
  const final = [];
  db.query(sqlCommand, [product_id])
    .then((stylesData) => {
      const stylesResultsArr = stylesData.rows[0].results;
      // console.log(stylesResultsArr);
      stylesResultsArr.map(styleObj => {
        console.log(styleObj.style_id)
        const style_id = styleObj.style_id;
        const sqlCommandPhotos = `SELECT * FROM photos WHERE style_id=($1)`;
        db.query(sqlCommandPhotos, [style_id])
          .then(results => {
            console.log('---------------------------------------------------------------------------------------------------------')
            console.log(styleObj.style_id)
            // console.log(results.rows);
            styleObj['photos'] = results.rows;
            console.log(styleObj)
          })
          .catch(console.log)
        })
        console.log(final)
        res.send(stylesData.rows[0])
      })
    .catch(err => {
      console.log(err);
      res.send(500);
    })
})

//PRODUCT STYLES - GET /products/:product_id/styles 
// app.get('/products/:product_id/styles', (req, res) => {
//   const { product_id } = req.params; 
//   const sqlCommandStyles = `SELECT style_id, name, original_price, sale_price, "default?" FROM styles WHERE product_id=($1)`
//   const sqlCommand =`SELECT id AS product_id, ${nestQuery(sqlCommandStyles)} AS results FROM products WHERE id=($1)`;
//   db.query(sqlCommand, [product_id])
//     .then(data => {
//       // console.log(data.rows[0].results)
//       const resultArr = [];
//       for (var i = 0; i < data.rows[0].results.length; i++){
//         const styleObj = data.rows[0].results[i];
//       // for (var styleObj of data.rows[0].results) {
//         console.log("outside of query: ", styleObj.style_id)
//         var sqlCommandPhotos = `SELECT * FROM photos WHERE style_id=${styleObj.style_id}`;
//         // const secondSqlCommand = `SELECT ${nestQuery(sqlCommandPhotos)} AS photos FROM photos WHERE style_id=($1)`;
//         const promise = db.query(sqlCommandPhotos)
//         // db.query(sqlCommandPhotos, [styleObj.style_id])
//           .then(data1 => {
//             // console.log(data1)
//             console.log('inside of query: ', styleObj.style_id)
//             styleObj['photos'] = data1.rows;
//             // console.log(styleObj)
//             // res.send(styleObj)
//             // console.log(styleObj)
//             return styleObj;
//           })
//           .catch(console.log);
//           resultArr.push(promise)
//       }
//       // res.send(styleObj)
//       console.log(resultArr)
//       return Promise.all(resultArr);
//     })
//     .then((resultArr) => {
//       res.send(resultArr)
//     })
//     // .then(result => res.send(result))
//     .catch(console.log)
// })





//RELATED PRODUCTS - GET /products/:product_id/related 



app.listen(port, () => {
  console.log(`SDC_Overview_GS server up and running at http://localhost:${port} :)`)
})