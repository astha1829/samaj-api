const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  thumbnailImageUrl: {
    type: String,
    required: true
  },
  images: [
    {
      type: String,
      required: true
    }
  ],
},{
  timestamps: true,
});

// gallerySchema.pre('save', function(next) {
//   this.updatedAt = new Date();
//   next();
// });

module.exports = mongoose.model('Gallery', gallerySchema);
