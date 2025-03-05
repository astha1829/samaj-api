const Joi = require('joi');
const createGallerySchema = Joi.object({
  title: Joi.string().required(),
  thumbnailImageUrl: Joi.string().uri().required(),
  imageUrls: Joi.array().items(Joi.string().uri()).min(1).required()
});

const updateGallerySchema = Joi.object({
  title: Joi.string().optional(),
  thumbnailImageUrl: Joi.string().uri().optional(),
  imageUrls: Joi.array().items(Joi.string().uri()).optional()
});



const deleteGallerySchema = Joi.object({
    id: Joi.string().required()
});


module.exports = {
    createGallerySchema,
    updateGallerySchema,
    deleteGallerySchema,
};
