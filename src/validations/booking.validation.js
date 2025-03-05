const Joi = require('joi');

// Define a custom validator for MongoDB ObjectId
const objectIdValidator = Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('Invalid function type ID');

// Validator for mobile numbers to match exactly 10 numeric characters
const mobileNumberValidator = Joi.string().custom((value, helper) => {
    // Check if the mobile number contains exactly 10 numeric characters
    if (/^\d{10}$/.test(value)) {
        return value;
    } else {
        return helper.error('invalidMobileNumber');
    }
}, 'Mobile number validation')
.messages({
    'invalidMobileNumber': 'Invalid mobile number. Mobile number must be exactly 10 digits.',
});

const createBookingSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().optional(),
    mobileNumber: mobileNumberValidator, // Mobile number must be exactly 10 digits
    city: Joi.string().required(),
    address: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    information: Joi.string().optional(),
    createdBy: Joi.string().valid('Admin', 'User').optional(),
    status: Joi.string().valid('Pending', 'Confirmed', 'Canceled').optional(),
    functionType: objectIdValidator.required(),
});

const updateBookingSchema = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().email().optional(),
    mobileNumber: mobileNumberValidator.optional(), // Mobile number must be exactly 10 digits
    city: Joi.string().optional(),
    address: Joi.string().optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
    information: Joi.string().optional(),
    createdBy: Joi.string().valid('Admin', 'User').optional(),
    status: Joi.string().valid('Pending', 'Confirmed', 'Canceled').optional(),
    functionType: objectIdValidator.required(),
}).or('firstName', 'lastName', 'email', 'mobileNumber', 'city', 'address', 'startDate', 'endDate', 'information', 'createdBy', 'status', 'functionType');

const deleteBookingSchema = Joi.object({
    id: Joi.string().required(),
});

module.exports = {
    createBookingSchema,
    updateBookingSchema,
    deleteBookingSchema,
};
