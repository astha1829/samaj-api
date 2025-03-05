const mongoose = require('mongoose');

const officeUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true,
        unique: true 
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    designation: {
        type: String,
        required: true
    },
    profilePicUrls: {
        type: mongoose.Schema.Types.Mixed, // Can be a string or array of strings
        required: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true, 
});

const OfficeUser = mongoose.model('OfficeUser', officeUserSchema);

module.exports = OfficeUser;
