const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    expires: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    blacklisted: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.Mixed, // Accept any type of data for user
        required: true,
    },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
