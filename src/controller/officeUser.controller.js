// officeuser.controller.js
const catchAsync = require('../utils/catchAsync');
const officeUserService = require('../service/officeuser.service');
const ApiError = require('../utils/ApiError');
const { getStandardMessage, getStandardResponse } = require('../utils/responseUtils');
const config = require('../config/config.js');

const createOfficeUser = catchAsync(async (req, res) => {
    try {
        const { name, number, email, designation, profilePicUrls, description } = req.body;

        // Check for required fields and profile picture URL(s)
        if (!name || !number || !email || !designation || !profilePicUrls) {
            throw new ApiError(200, 'Name, number, email, designation, and profile picture URL(s) are required');
        }

        // Construct office user data
        const officeUserData = { name, number, email, designation, profilePicUrls, description };
        const createdOfficeUser = await officeUserService.createOfficeUser(officeUserData);

        if (createdOfficeUser) {
            res.status(200).send(getStandardMessage(true, 200, 'Office user created successfully'));
        } else {
            res.status(200).send(getStandardResponse(false, 200, 'Failed to create office user'));
        }
    } catch (error) {
        console.error(error);
        res.status(200).send(getStandardResponse(false, 200, error.message));
    }
});




const updateOfficeUser = catchAsync(async (req, res) => {
    try {
        const { id } = req.query;
        const { name, number, email, designation, profilePicUrls, description } = req.body;

        // Validate the ID
        if (!id) {
            throw new ApiError(200, 'Office user ID is required');
        }

        // Ensure profilePicUrls is always an array if provided
        let profilePics;
        if (profilePicUrls) {
            profilePics = Array.isArray(profilePicUrls) ? profilePicUrls : [profilePicUrls];
        }

        // Construct the update data
        const updateData = { name, number, email, designation, profilePicUrls: profilePics, description };
        const updatedOfficeUser = await officeUserService.updateOfficeUser(id, updateData);

        if (updatedOfficeUser) {
            res.status(200).send(getStandardMessage(true, 200, 'Office user updated successfully'));
        } else {
            res.status(200).send(getStandardResponse(false, 200, 'Failed to update office user'));
        }
    } catch (error) {
        console.error(error);
        res.status(200).send(getStandardResponse(false, 200, error.message));
    }
});


const deleteOfficeUser = catchAsync(async (req, res) => {
    try {
        const { id } = req.query;

        // Validate the ID
        if (!id) {
            throw new ApiError(200, 'Office user ID is required');
        }

        const deletedOfficeUser = await officeUserService.deleteOfficeUser(id);
        if (deletedOfficeUser) {
            res.status(200).send(getStandardMessage(true, 200, 'Office user deleted successfully'));
        } else {
            res.status(200).send(getStandardResponse(false, 200, 'Failed to delete office user'));
        }
    } catch (error) {
        console.error(error);
        res.status(200).send(getStandardResponse(false, 200, error.message));
    }
});

const getAllOfficeUsers = catchAsync(async (req, res) => {
    try {
        const officeUsers = await officeUserService.getAllOfficeUsers();
        const responseData = {
            data: officeUsers,
            imageBaseUrl: config.imageBaseUrl,
        };

        res.status(200).json(getStandardResponse(true, 200, 'Office users retrieved successfully', responseData));
    } catch (error) {
        console.error(error);
        res.status(200).json(getStandardResponse(false, 200, error.message, null));
    }
});

module.exports = {
    createOfficeUser,
    updateOfficeUser,
    deleteOfficeUser,
    getAllOfficeUsers,
};
