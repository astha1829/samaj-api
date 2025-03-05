const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const morgan = require('../src/config/morgan');
const adminRoutes = require('../src/routes/admin.route');
const functionRoutes = require('../src/routes/function.route');
const galleryRoutes = require('../src/routes/gallery.routes');
const HistoryRoutes=require('../src/routes/history.route');
const officeUserRoutes=require('../src/routes/officeUser.route');
const upcomingEventRoutes = require('../src/routes/upcomingEvent.route'); 
const homeRoutes = require('../src/routes/home.routes');
const bookingRoutes = require('../src/routes/booking.routes');



const app = express();
const bodyParser = require('body-parser');
const authMiddleware = require('./middlewares/auth');
const multer = require('multer'); 
const path = require('path');
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(morgan.successHandler);
app.use(morgan.errorHandler);
app.use(bodyParser.json());
const galleryImagesPath = multer({ dest: 'uploads/gallery-images/' }); // Multer config for gallery images
app.use('/gallery-images', express.static('uploads/gallery-images')); // Static serving for gallery images

const upload = multer({ dest: 'uploads/' });
app.use('/uploads', express.static('uploads'));

const historyImagesPath = multer({ dest: 'uploads/history-images/' }); 
app.use('/history-images', express.static('uploads/history-images'));

const officeUserProfilePicsPath = multer({ dest: 'uploads/office-user-profile-pics/' }); 
app.use('/office-user-profile-pics', express.static('uploads/office-user-profile-pics'));

const upcomingEventImagesPath = multer({ dest: 'uploads/upcoming-event-images/' }); 
app.use('/upcoming-event-images', express.static('uploads/upcoming-event-images'));

const homeImagesPath = multer({ dest: 'uploads/home-images/' }); 
app.use('/home-images', express.static('uploads/home-images'));


// Routes
app.use('/api', adminRoutes);
app.use('/api', functionRoutes);
app.use('/api', galleryRoutes); 
app.use('/api', HistoryRoutes); 
app.use('/api', officeUserRoutes);
app.use('/api', upcomingEventRoutes);
app.use('/api', homeRoutes);
app.use('/api', bookingRoutes);


app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Multer error handling
        res.status(200).json({
            status: 200,
            message: 'File upload error'
        });
    } else {
        // Other errors
        res.status(err.status || 200).json({
            status: err.status || 200,
            message: err.message || 'Internal server error'
        });
    }
});


module.exports = app;