
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const bookingService = require('../service/booking.service');
const ApiError = require('../utils/ApiError');
const multer = require('multer');
const upload = multer().none();
const { getStandardMessage, getStandardResponse } = require('../utils/responseUtils');
const config = require('../config/config.js');

const createBooking = [
    upload, 
    catchAsync(async (req, res, next) => {
        try {
            const bookingData = req.body;
            const createdBooking = await bookingService.createBooking(bookingData);
            if (createdBooking) {
                res.status(200).send(getStandardMessage(true, 200, 'Booking created successfully'));
            }
        } catch (error) {
            console.error(error);
            res.status(200).send(getStandardResponse(false, 200, error.message));
        }
    })
];

const updateBooking = [
    upload,
    catchAsync(async (req, res, next) => {
        try {
            const { id } = req.query;
            const updateData = req.body;

            if (!id) {
                throw new ApiError(200, 'Booking ID is required');
            }

            const updatedBooking = await bookingService.updateBooking(id, updateData);
            if (updatedBooking) {
                res.status(200).send(getStandardMessage(true, 200, 'Booking updated successfully'));
            }
        } catch (error) {
            console.error(error);
            res.status(200).send(getStandardResponse(false, 200, error.message));
        }
    })
];

const deleteBooking = catchAsync(async (req, res, next) => {
    try {
        const { id } = req.query;

        if (!id) {
            throw new ApiError(200, 'Booking ID is required');
        }

        const deletedBooking = await bookingService.deleteBooking(id);
        if (deletedBooking) {
            res.status(200).send(getStandardMessage(true, 200, 'Booking deleted successfully'));
        }
    } catch (error) {
        console.error(error);
        res.status(200).send(getStandardResponse(false, 200, error.message));
    }
});

const getAllBookings = catchAsync(async (req, res, next) => {
    try {
        const { status, functionType, id } = req.query;
        const bookings = await bookingService.getAllBookings(status, functionType, id);

        const responseData = {
            data: bookings,
            imageBaseUrl: config.imageBaseUrl,
        };

        res.status(200).json(getStandardResponse(true, 200, 'Bookings retrieved successfully', responseData));
    } catch (error) {
        console.error(error);
        res.status(200).json(getStandardResponse(false, 200, error.message, null));
    }
});

module.exports = {
    createBooking,
    updateBooking,
    deleteBooking,
    getAllBookings,
};
