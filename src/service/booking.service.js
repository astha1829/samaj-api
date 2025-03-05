const httpStatus = require('http-status');
const Booking = require('../model/booking.model');
const ApiError = require('../utils/ApiError');
const Functional = require('../model/function.model'); 



const createBooking = async (bookingData) => {
    try {
        const createdBooking = await Booking.create(bookingData);
        return createdBooking;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to create booking: ${error.message}`);
    }
};

const updateBooking = async (id, updateData) => {
    try {
       
        const booking = await Booking.findById(id);

       
        if (!booking) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
        }

   
        if (typeof updateData !== 'object' || updateData === null) {
            throw new ApiError(200, 'Invalid update data');
        }

  
        Object.entries(updateData).forEach(([key, value]) => {
            booking[key] = value;
        });

 
        const updatedBooking = await booking.save();
        return updatedBooking;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to update booking: ${error.message}`);
    }
};


const deleteBooking = async (id) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
        }

        return deletedBooking;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to delete booking: ${error.message}`);
    }
};

const getAllBookings = async (status) => {
    try {
        let query = {};

        if (status) {
            query.status = status;
        }

        const bookings = await Booking.find(query)
            .populate({
                path: 'functionType', 
                model: Functional 
            });

        return bookings;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to retrieve bookings: ${error.message}`);
    }
};








module.exports = {
    createBooking,
    updateBooking,
    deleteBooking,
    getAllBookings,
   
};
