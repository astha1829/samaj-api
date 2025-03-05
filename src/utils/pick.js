/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const pick = (obj, keys) => {
    return keys.reduce((acc, key) => {
      if (obj && obj.hasOwnProperty(key)) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  };
  
  
  
  
  module.exports = pick;
  