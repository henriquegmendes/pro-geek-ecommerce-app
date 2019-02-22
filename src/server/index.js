require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const DatabaseConnection = require('./../db/connection.js');

// Start Express
const app = express();

// Database Connection
DatabaseConnection();

// Server Init
const HTTP_SERVER = process.env.PORT;
app.listen(HTTP_SERVER, () => {
  console.log(`server listening on port ${HTTP_SERVER}!`);
});

// Routes Response Listener
app.use(morgan('combined'));

// Body Parser Init
app.use(bodyParser.json());

// Requiring Endpoints
const users = require('../endpoints/users.js');
const products = require('../endpoints/products.js');
const orders = require('../endpoints/orders.js');
const evaluations = require('../endpoints/evaluation.js');
const categories = require('../endpoints/categories.js');

app.use('/users', users);
// app.use('/products', products);
// app.use('/orders', orders);
// app.use('/evaluations', evaluations);
// app.use('/categories', categories);

module.exports = app;
