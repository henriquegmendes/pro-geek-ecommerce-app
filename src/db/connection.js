require('dotenv').config();

const mongoose = require('mongoose');

const { DB_HOST, DB_PORT, DB_NAME } = process.env;

module.exports = () => {
  mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
    .then(() => {
      console.log('connected to mongodb');
    })
    .catch((err) => {
      throw new Error(err);
    });
};
