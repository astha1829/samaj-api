const httpStatus = require('http-status');
const History = require('../model/history.model');
const ApiError = require('../utils/ApiError');
const fs = require('fs');
const path = require('path');

const createHistory = async (historyData) => {
    try {
        const createdHistory = await History.create(historyData);
        return createdHistory;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to create history: ${error.message}`);
    }
};

const updateHistory = async (id, updateData) => {
    try {
        
        let history = await History.findById(id);

        if (!history) {
            throw new ApiError(httpStatus.NOT_FOUND, 'History not found');
        }

        
        if (updateData.title) history.title = updateData.title;
        if (updateData.description) history.description = updateData.description;

        
        if (updateData.images && updateData.images.length > 0) {
            
            history.images = history.images.concat(updateData.images);
        }

        
        const updatedHistory = await history.save();

        return updatedHistory;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to update history: ${error.message}`);
    }
};



const deleteHistory = async (id) => {
    try {
        
        const history = await History.findById(id);
        
        if (!history) {
            throw new ApiError(httpStatus.NOT_FOUND, 'History not found');
        }

        const images = history.images;

      
        for (const image of images) {
            const imagePath = path.resolve(image.path);
            if (fs.existsSync(imagePath)) {
               
                try {
                    fs.unlinkSync(imagePath);
                    console.log(`Deleted image: ${imagePath}`);
                } catch (err) {
                    console.error(`Failed to delete image: ${imagePath}. Error: ${err.message}`);
                   
                }
            }
        }

        const deletedHistory = await History.findByIdAndDelete(id);
        if (!deletedHistory) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete history');
        }

        return deletedHistory;
    } catch (error) {
  
        console.error(`Error deleting history: ${error.message}`);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to delete history: ${error.message}`);
    }
};




const getAllHistories = async () => {
    try {
  
        const histories = await History.find();
        return histories;
    } catch (error) {
        throw new Error(`Failed to retrieve histories: ${error.message}`);
    }
};


module.exports = {
    createHistory,
    updateHistory,
    deleteHistory,
    getAllHistories,
};
