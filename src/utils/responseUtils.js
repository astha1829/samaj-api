// responseUtils.js

// Import any required configurations
const config = require('../config/config.js');

// Function to generate a standard message
function getStandardMessage(status, code, message) {
  return {
    status: status,
    code: code,
    message: message,
  };
}

// Function to generate a standard response
function getStandardResponse(status, code, message, data) {
  return {
    status: status,
    code: code,
    message: message,
    data: data,
    // imageBaseUrl: config.imageBaseUrl,
  };
}

// Export the utility functions
module.exports = {
  getStandardMessage,
  getStandardResponse,
};
