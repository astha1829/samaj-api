const Joi = require('joi');

const createHomeSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    imageUrl: Joi.string().uri().required(),
});

const updateHomeSchema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    imageUrl: Joi.string().uri().optional(),
}).xor('title', 'description', 'imageUrl');

const deleteHomeSchema = Joi.object({
    id: Joi.string().required(),
});

module.exports = {
    createHomeSchema,
    updateHomeSchema,
    deleteHomeSchema,
};
