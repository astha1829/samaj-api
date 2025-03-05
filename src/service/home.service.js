const httpStatus = require('http-status');
const Home = require('../model/home.model');
const ApiError = require('../utils/ApiError');
const fs = require('fs');
const path = require('path');

const createHome = async (homeData) => {
    try {
        const createdHome = await Home.create(homeData);
        return createdHome;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to create home: ${error.message}`);
    }
};

const updateHome = async (id, updateData) => {
    try {
        const home = await Home.findById(id);

        if (!home) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Home not found');
        }

        if (updateData.title) home.title = updateData.title;
        if (updateData.description) home.description = updateData.description;

        if (updateData.image) {
            home.image = updateData.image;
        }

        const updatedHome = await home.save();
        return updatedHome;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to update home: ${error.message}`);
    }
};

const deleteHome = async (id) => {
    try {
        const home = await Home.findById(id);

        if (!home) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Home not found');
        }
        if (home.image && typeof home.image === 'object') {
            const imagePath = path.resolve(home.image.path);
            if (fs.existsSync(imagePath)) {
                try {
                    fs.unlinkSync(imagePath); 
                    console.log(`Deleted image: ${imagePath}`);
                } catch (error) {
                    console.error(`Failed to delete image: ${imagePath}. Error: ${error.message}`);
                }
            }
        }
        const deletedHome = await Home.findByIdAndDelete(id);

        if (!deletedHome) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete Home');
        }

        return deletedHome;
    } catch (error) {
        console.error(`Error deleting home: ${error.message}`);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to delete Home: ${error.message}`);
    }
};



const getAllHomes = async () => {
    try {
        const homes = await Home.find();
        return homes;
    } catch (error) {
        throw new Error(`Failed to retrieve homes: ${error.message}`);
    }
};

module.exports = {
    createHome,
    updateHome,
    deleteHome,
    getAllHomes,
};
