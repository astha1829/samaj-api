// function.controller
const catchAsync = require('../utils/catchAsync');
const functionService = require('../service/function.service');
const { getStandardMessage, getStandardResponse } = require('../utils/responseUtils');
const config = require('../config/config.js');

const createFunction = catchAsync(async (req, res) => {
    try {
        const { Name, Price } = req.body;
        const functionData = { Name, Price };

        const createdFunction = await functionService.createFunction(functionData);
        
        if (createdFunction) {
            res.status(200).send(getStandardMessage(true, 200, 'Function record created successfully'));
        } else {
            res.status(200).send(getStandardResponse(false, 200, 'Failed to create function'));
        }
    } catch (error) {
        console.error(error);
        res.status(200).send(getStandardResponse(false, 200, error.message));
    }
});

const updateFunction = catchAsync(async (req, res) => {
    try {
        const { functionId } = req.query;
        const { Name, Price } = req.body;

        const updatedFunction = await functionService.updateFunction(functionId, { Name, Price });

        if (updatedFunction) {
            res.status(200).send(getStandardMessage(true, 200, 'Function record updated successfully'));
        } else {
            res.status(200).send(getStandardResponse(false, 200, 'Failed to update function'));
        }
    } catch (error) {
        console.error(error);
        res.status(200).send(getStandardResponse(false, 200, error.message));
    }
});

const deleteFunction = catchAsync(async (req, res) => {
    try {
        const { functionId } = req.query;

        const deletedFunction = await functionService.deleteFunction(functionId);

        if (deletedFunction) {
            res.status(200).send(getStandardMessage(true, 200, 'Function record deleted successfully'));
        } else {
            res.status(200).send(getStandardResponse(false, 200, 'Failed to delete function'));
        }
    } catch (error) {
        console.error(error);
        res.status(200).send(getStandardResponse(false, 200, error.message));
    }
});

const getAllFunction = catchAsync(async (req, res) => {
    try {
        const functions = await functionService.getAllFunction();
        const responseData = {
            data: functions,
            imageBaseUrl: config.imageBaseUrl,
        };
        
        res.status(200).json(getStandardResponse(true, 200, 'Functions retrieved successfully', responseData));
    } catch (error) {
        console.error(error);
        res.status(200).json(getStandardResponse(false, 200, error.message, null));
    }
});

module.exports = {
    createFunction,
    updateFunction,
    deleteFunction,
    getAllFunction,
};
