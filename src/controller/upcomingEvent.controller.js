const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const upcomingEventService = require('../service/upcomingEvent.service');
const ApiError = require('../utils/ApiError');
const { getStandardMessage, getStandardResponse } = require('../utils/responseUtils');
const config = require('../config/config.js');

const createUpcomingEvent = catchAsync(async (req, res) => {
    try {
        const { title, description, dateTime, contactPerson, images } = req.body;

        if (!title || !description || !dateTime || !contactPerson || !contactPerson.name || !contactPerson.number) {
            throw new ApiError(200, 'Title, description, dateTime, contact person name, and contact person number are required');
        }

        if (!images || images.length === 0) {
            throw new ApiError(200, 'At least one image URL is required');
        }

        const upcomingEventData = { title, description, dateTime, contactPerson, images };
        const createdUpcomingEvent = await upcomingEventService.createUpcomingEvent(upcomingEventData);

        if (createdUpcomingEvent) {
            res.status(200).send(getStandardMessage(true, 200, 'Upcoming event created successfully'));
        } else {
            res.status(200).send(getStandardResponse(false, 200, 'Failed to create upcoming event'));
        }
    } catch (error) {
        console.error(error);
        res.status(200).send(getStandardResponse(false, 200, error.message));
    }
});

const updateUpcomingEvent = catchAsync(async (req, res) => {
    try {
        const { id } = req.query;
        const { title, description, dateTime, contactPerson, images } = req.body;

        if (!id) {
            throw new ApiError(200, 'Upcoming event ID is required');
        }

        const updateData = { title, description, dateTime, contactPerson, images };
        const updatedUpcomingEvent = await upcomingEventService.updateUpcomingEvent(id, updateData);

        if (updatedUpcomingEvent) {
            res.status(200).send(getStandardMessage(true, 200, 'Upcoming event updated successfully'));
        } else {
            res.status(200).send(getStandardResponse(false, 200, 'Failed to update upcoming event'));
        }
    } catch (error) {
        console.error(error);
        res.status(200).send(getStandardResponse(false, 200, error.message));
    }
});

const deleteUpcomingEvent = catchAsync(async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            throw new ApiError(200, 'Upcoming event ID is required');
        }

        const deletedUpcomingEvent = await upcomingEventService.deleteUpcomingEvent(id);

        if (deletedUpcomingEvent) {
            res.status(200).send(getStandardMessage(true, 200, 'Upcoming event deleted successfully'));
        } else {
            res.status(200).send(getStandardResponse(false, 200, 'Failed to delete upcoming event'));
        }
    } catch (error) {
        console.error(error);
        res.status(200).send(getStandardResponse(false, 200, error.message));
    }
});

const getAllUpcomingEvents = catchAsync(async (req, res) => {
    try {
        const upcomingEvents = await upcomingEventService.getAllUpcomingEvents();
        const responseData = {
            data: upcomingEvents,
            imageBaseUrl: config.imageBaseUrl,
        };

        res.status(200).json(getStandardResponse(true, 200, 'Upcoming events retrieved successfully', responseData));
    } catch (error) {
        console.error(error);
        res.status(200).json(getStandardResponse(false, 200, error.message, null));
    }
});

module.exports = {
    createUpcomingEvent,
    updateUpcomingEvent,
    deleteUpcomingEvent,
    getAllUpcomingEvents,
};