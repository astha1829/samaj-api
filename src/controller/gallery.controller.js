// gallery.controller.js
const catchAsync = require('../utils/catchAsync');
const galleryService = require('../service/gallery.service');
const ApiError = require('../utils/ApiError');
const { getStandardMessage, getStandardResponse } = require('../utils/responseUtils');
const config = require('../config/config.js');
const Gallery=require('../model/gallery.model.js');


const createGallery = catchAsync(async (req, res) => {
    try {
        const { title, thumbnailImageUrl, imageUrls } = req.body;
        
        if (!title || !thumbnailImageUrl || !imageUrls || imageUrls.length === 0) {
            throw new ApiError(400, 'Title, thumbnail image URL, and at least one image URL are required');
        }

        const newGallery = new Gallery({ title, thumbnailImageUrl, images: imageUrls });
        await newGallery.save();
        res.status(201).send({ message: "Gallery created successfully!", newGallery });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


const updateGallery = catchAsync(async (req, res) => {
    try {
        const { id } = req.query;
        const { title, thumbnailImageUrl, imageUrls } = req.body;

        if (!id) {
            throw new ApiError(400, 'Gallery ID is required');
        }

        const updateData = {};
        if (title) {
            updateData.title = title;
        }
        if (thumbnailImageUrl) {
            updateData.thumbnailImageUrl = thumbnailImageUrl;
        }
        if (imageUrls) {
            updateData.images = imageUrls;
        }

        const updatedGallery = await galleryService.updateGallery(id, updateData);
        if (updatedGallery) {
            res.status(200).send(getStandardMessage(true, 200, 'Gallery updated successfully'));
        } else {
            res.status(404).send(getStandardResponse(false, 404, 'Gallery not found'));
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(getStandardResponse(false, 500, error.message));
    }
});



const deleteGallery = catchAsync(async (req, res) => {
    try {
        const { id } = req.query;

        // Validate ID
        if (!id) {
            throw new ApiError(200, 'Gallery ID is required');
        }

        const deletedGallery = await galleryService.deleteGallery(id);
        if (deletedGallery) {
            res.status(200).send(getStandardMessage(true, 200, 'Gallery deleted successfully'));
        } else {
            res.status(200).send(getStandardResponse(false, 200, 'Failed to delete gallery'));
        }
    } catch (error) {
        console.error(error);
        res.status(200).send(getStandardResponse(false, 200, error.message));
    }
});

const getAllGalleries = catchAsync(async (req, res) => {
    try {
        const galleries = await galleryService.getAllGalleries();
        const responseData = {
            data: galleries,
            imageBaseUrl: config.imageBaseUrl,
        };

        res.status(200).json(getStandardResponse(true, 200, 'Galleries retrieved successfully', responseData));
    } catch (error) {
        console.error(error);
        res.status(200).json(getStandardResponse(false, 200, error.message, null));
    }
});

module.exports = {
    createGallery,
    updateGallery,
    deleteGallery,
    getAllGalleries,
};
