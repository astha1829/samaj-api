const express = require('express');
const validate = require('../middlewares/validate');
const bookingValidation = require('../../src/validations/booking.validation');
const bookingController = require('../../src/controller/booking.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/booking',  validate(bookingValidation.createBookingSchema), bookingController.createBooking);

router.post('/update-booking', validate(bookingValidation.updateBookingSchema), bookingController.updateBooking);

router.delete('/booking', validate(bookingValidation.deleteBookingSchema), bookingController.deleteBooking);

router.get('/bookings', bookingController.getAllBookings);


module.exports = router;
