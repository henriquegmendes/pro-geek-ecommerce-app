require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const DatabaseConnection = require('./../db/connection.js');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const User = require('./../../models/User.js');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// require('./passport.js');
passport.serializeUser((loggedInUser, cb) => {
  console.log('serialize')
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  console.log('deserialize')
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});

passport.use(new LocalStrategy((username, password, next) => {
  console.log('passport use')
  User.findOne({ email }, (err, foundUser) => {
    console.log('user. findone')
    if (err) {
      next(err);
      return;
    }

    if (!foundUser) {
      next(null, false, { message: 'Incorrect username.' });
      return;
    }

    if (!bcrypt.compareSync(password, foundUser.password)) {
      next(null, false, { message: 'Incorrect password.' });
      return;
    }

    next(null, foundUser);
  });
}));



// Start Express
const app = express();

// Database Connection
DatabaseConnection();

// Server Init
const HTTP_SERVER = process.env.PORT;
app.listen(HTTP_SERVER, () => {
  console.log(`server listening on port ${HTTP_SERVER}!`);
});

// Session
app.use(session({
  secret: "some secret goes here",
  resave: true,
  saveUninitialized: true,
  // cookie: { maxAge: 3600000 }
}))

// Passport
app.use(passport.initialize());
app.use(passport.session());

// CORS
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

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
