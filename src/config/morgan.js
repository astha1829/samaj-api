// src/config/morgan.js
const morgan = require('morgan');

// Define the format for logging
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

// Create a middleware function using morgan
const successHandler = morgan(morganFormat, {
  skip: (req, res) => res.statusCode >= 400, // Skip logging for unsuccessful requests
});

const errorHandler = morgan(morganFormat, {
  skip: (req, res) => res.statusCode < 400, // Skip logging for successful requests
});

module.exports = {
  successHandler,
  errorHandler,
};
