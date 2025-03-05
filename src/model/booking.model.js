const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
    },
    mobileNumber: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    information: {
        type: String,
    },
    createdBy: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'Admin',
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Canceled'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
  
    functionType: {
        type: Schema.Types.ObjectId,
        ref: 'Function',
        required: true,
    },
});



bookingSchema.index({ email: 1 }, { unique: true, sparse: true });


module.exports = mongoose.model('Booking', bookingSchema);
