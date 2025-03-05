const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const homeService = require('../service/home.service');
const ApiError = require('../utils/ApiError');
const { getStandardMessage, getStandardResponse } = require('../utils/responseUtils');
const config = require('../config/config.js');

const createHome = catchAsync(async (req, res) => {
    try {
        const { title, description, imageUrl } = req.body;

        // Validate title, description, and imageUrl
        if (!title || !description || !imageUrl) {
            throw new ApiError(200, 'Title, description, and image URL are required');
        }

        const image = { url: imageUrl };

        const homeData = { title, description, image };
        const createdHome = await homeService.createHome(homeData);

        if (createdHome) {
            res.status(200).send(getStandardMessage(true, 200, 'Home created successfully'));
        } else {
            res.status(200).send(getStandardResponse(false, 200, 'Failed to create home'));
        }
    } catch (error) {
        console.error(error);
        res.status(200).send(getStandardResponse(false, 200, error.message));
    }
});

const updateHome = catchAsync(async (req, res) => {
    try {
        const { id } = req.query;
        const { title, description, imageUrl } = req.body;

        if (!id) {
            throw new ApiError(200, 'Home ID is required');
        }

        let image;
        if (imageUrl) {
            image = { url: imageUrl };
        }

        const updateData = { title, description, image };
        const updatedHome = await homeService.updateHome(id, updateData);

        if (updatedHome) {
            res.status(200).send(getStandardMessage(true, 200, 'Home updated successfully'));
        } else {
            res.status(200).send(getStandardResponse(false, 200, 'Failed to update home'));
        }
    } catch (error) {
        console.error(error);
        res.status(200).send(getStandardResponse(false, 200, error.message));
    }
});

const deleteHome = catchAsync(async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            throw new ApiError(200, 'Home ID is required');
        }

        const deletedHome = await homeService.deleteHome(id);
        if (deletedHome) {
            res.status(200).send(getStandardMessage(true, 200, 'Home deleted successfully'));
        } else {
            res.status(200).send(getStandardResponse(false, 200, 'Failed to delete home'));
        }
    } catch (error) {
        console.error(error);
        res.status(200).send(getStandardResponse(false, 200, error.message));
    }
});

const getAllHomes = catchAsync(async (req, res) => {
    try {
        const homes = await homeService.getAllHomes();
        const responseData = {
            data: homes,
            imageBaseUrl: config.imageBaseUrl,
        };

        res.status(200).json(getStandardResponse(true, 200, 'Homes retrieved successfully', responseData));
    } catch (error) {
        console.error(error);
        res.status(200).json(getStandardResponse(false, 200, error.message, null));
    }
});

module.exports = {
    createHome,
    updateHome,
    deleteHome,
    getAllHomes,
};
