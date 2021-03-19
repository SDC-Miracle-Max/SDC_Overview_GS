const express = require('express')
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('dev'));

//LIST PRODUCTS - GET /products 
app.get('/products', (req, res) => {
  //query to db
  if (err) {
    console.log(err);
    res.send(500);
  } else {
    console.log('success!', data)
  }
})

//PRODUCT INFORMATION - GET /products/:product_id

//PRODUCT STYLES - GET /products/:product_id/styles 

//RELATED PRODUCTS - GET /products/:product_id/related 



app.listen(port, () => {
  console.log(`SDC_Overview_GS server up and running at http://localhost:${port} :)`)
})