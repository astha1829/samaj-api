const httpStatus = require("http-status");
const Gallery = require("../model/gallery.model");
const ApiError = require("../utils/ApiError");

const createGallery = async (galleryData) => {
  try {
    const createdGallery = await Gallery.create(galleryData);
    return createdGallery;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Failed to create gallery: ${error.message}`
    );
  }
};

const updateGallery = async (id, updateData) => {
  try {
    const existingGallery = await Gallery.findById(id);

    if (!existingGallery) {
      throw new ApiError(httpStatus.NOT_FOUND, "Gallery not found");
    }

    existingGallery.title = updateData.title || existingGallery.title;
    existingGallery.thumbnailImage = updateData.thumbnailImage || existingGallery.thumbnailImage;
    existingGallery.images = updateData.images || existingGallery.images;

    const updatedGallery = await existingGallery.save();

    return updatedGallery;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Failed to update gallery: ${error.message}`
    );
  }
};

const deleteGallery = async (id) => {
  try {
    const gallery = await Gallery.findById(id);

    if (!gallery) {
      throw new ApiError(httpStatus.NOT_FOUND, "Gallery not found");
    }

    // No file deletion as images are now referenced by URLs

    const deletedGallery = await Gallery.findByIdAndDelete(id);

    if (!deletedGallery) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to delete gallery"
      );
    }

    return deletedGallery;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Failed to delete gallery: ${error.message}`
    );
  }
};

const getAllGalleries = async () => {
  try {
    const galleries = await Gallery.find();
    return galleries;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Failed to fetch galleries: ${error.message}`
    );
  }
};

module.exports = {
  createGallery,
  updateGallery,
  deleteGallery,
  getAllGalleries,
};
