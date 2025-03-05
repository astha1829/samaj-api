const mongoose = require('mongoose');

const upcomingEventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    images: [{
        type: String, 
        required: true,
    }],
    description: {
        type: String,
        required: true,
    },
    dateTime: {
        date: {
            type: String, // Use String to store date in the required format
            required: true,
        },
        time: {
            type: String, // Use String to store time in the required format
            required: true,
        }
    },
    contactPerson: {
        name: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        }
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('UpcomingEvent', upcomingEventSchema);
