const httpStatus = require('http-status');
const OfficeUser = require('../model/officeUser.model');
const ApiError = require('../utils/ApiError');
const fs = require('fs');
const path = require('path');

const createOfficeUser = async (officeUserData) => {
    try {
        const createdOfficeUser = await OfficeUser.create(officeUserData);
        return createdOfficeUser;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to create office user: ${error.message}`);
    }
};

const updateOfficeUser = async (id, updateData) => {
    try {
       
        const updatedOfficeUser = await OfficeUser.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedOfficeUser) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Office user not found');
        }

        return updatedOfficeUser;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to update office user: ${error.message}`);
    }
};

const deleteOfficeUser = async (id) => {
    try {
        const officeUser = await OfficeUser.findById(id);

        if (!officeUser) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Office user not found');
        }

        if (officeUser.profilePic && officeUser.profilePic.path) {
            const profilePicPath = path.resolve(officeUser.profilePic.path);
            if (fs.existsSync(profilePicPath)) {
                await fs.unlink(profilePicPath, (err) => {
                    if (err) {
                        console.error(`Failed to delete profile picture: ${profilePicPath}. Error: ${err.message}`);
                    } else {
                        console.log(`Deleted profile picture: ${profilePicPath}`);
                    }
                });
            }
        }

        const deletedOfficeUser = await OfficeUser.findByIdAndDelete(id);

        if (!deletedOfficeUser) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete office user');
        }

        return deletedOfficeUser;
    } catch (error) {
        console.error(`Error deleting office user: ${error.message}`);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to delete office user: ${error.message}`);
    }
};




const getAllOfficeUsers = async () => {
    try {
       
        const officeUsers = await OfficeUser.find();
        return officeUsers;
    } catch (error) {
        throw new Error(`Failed to retrieve office users: ${error.message}`);
    }
};

module.exports = {
    createOfficeUser,
    updateOfficeUser,
    deleteOfficeUser,
    getAllOfficeUsers
};
