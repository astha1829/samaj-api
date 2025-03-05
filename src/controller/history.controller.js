const catchAsync = require('../utils/catchAsync');
const historyService = require('../service/history.service');
const ApiError = require('../utils/ApiError');
const { getStandardMessage, getStandardResponse } = require('../utils/responseUtils');
const config = require('../config/config.js');

const createHistory = catchAsync(async (req, res) => {
    try {
        const { title, description, images } = req.body;

        // Validate that title, description, and image URLs are provided
        if (!title || !description || !images || images.length === 0) {
            throw new ApiError(200, 'Title, description, and at least one image URL are required');
        }

        const historyData = { title, description, images };
        const createdHistory = await historyService.createHistory(historyData);

        if (createdHistory) {
            res.status(200).send(getStandardMessage(true, 200, 'History created successfully'));
        } else {
            res.status(200).send(getStandardResponse(false, 200, 'Failed to create history'));
        }
    } catch (error) {
        console.error(error);
        res.status(200).send(getStandardResponse(false, 200, error.message));
    }
});

const updateHistory = catchAsync(async (req, res) => {
    try {
        const { id } = req.query;
        const { title, description, images } = req.body;

        if (!id) {
            throw new ApiError(200, 'History ID is required');
        }

        const updateData = { title, description, images };

        const updatedHistory = await historyService.updateHistory(id, updateData);

        if (updatedHistory) {
            res.status(200).send(getStandardMessage(true, 200, 'History updated successfully'));
        } else {
            res.status(200).send(getStandardResponse(false, 200, 'Failed to update history'));
        }
    } catch (error) {
        console.error(error);
        res.status(200).send(getStandardResponse(false, 200, error.message));
    }
});



const deleteHistory = catchAsync(async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            throw new ApiError(200, 'History ID is required');
        }

        const deletedHistory = await historyService.deleteHistory(id);
        if (deletedHistory) {
            res.status(200).send(getStandardMessage(true, 200, 'History deleted successfully'));
        } else {
            res.status(200).send(getStandardResponse(false, 200, 'Failed to delete history'));
        }
    } catch (error) {
        console.error(error);
        res.status(200).send(getStandardResponse(false, 200, error.message));
    }
});

const getAllHistories = catchAsync(async (req, res) => {
    try {
        const histories = await historyService.getAllHistories();
        const responseData = {
            data: histories,
            imageBaseUrl: config.imageBaseUrl,
        };

        res.status(200).json(getStandardResponse(true, 200, 'Histories retrieved successfully', responseData));
    } catch (error) {
        console.error(error);
        res.status(200).json(getStandardResponse(false, 200, error.message, null));
    }
});

module.exports = {
    createHistory,
    updateHistory,
    deleteHistory,
    getAllHistories,
};
