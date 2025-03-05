
const config = require('../config/config');

// Assuming `filename` is the name of the file you want to generate the URL for.
function generateImageUrl(filename) {

  // Use base URL and append the relative path to the filename
  return `${config.imageBaseUrl}${filename}`;
}

// Export the function
module.exports = {
  generateImageUrl,
};
