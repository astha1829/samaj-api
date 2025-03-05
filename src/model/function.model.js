const mongoose = require('mongoose');
const { Schema } = mongoose;

const functionalSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

const Functional = mongoose.model('Functional', functionalSchema);

// Export the 'Functional' model
module.exports = Functional;