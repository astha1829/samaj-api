const httpStatus = require('http-status');
const FunctionModel = require('../model/function.model');
const ApiError = require('../utils/ApiError');


const createFunction = async (functionData) => {
  try {
      const createdFunction = await FunctionModel.create(functionData);
      return createdFunction;
  } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateFunction = async (id, updateData) => {
  try {
   
    const updatedFunction = await FunctionModel.findOneAndUpdate(
      { _id: id }, 
      updateData, 
      { new: true } 
    );

  
    if (!updatedFunction) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Function not found');
    }

    return updatedFunction;
  } catch (error) {
 
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};


const deleteFunction = async (id) => {
  try {
    const deletedFunction = await FunctionModel.findByIdAndDelete(id);
    if (!deletedFunction) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Function not found');
    }
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAllFunction = async () => {
  try {
    const functions = await FunctionModel.find();
    return functions;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  createFunction,
  updateFunction,
  deleteFunction,
  getAllFunction,
};