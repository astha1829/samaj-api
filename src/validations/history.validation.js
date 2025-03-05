const Joi = require('joi');

const createHistorySchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    images: Joi.array().items(Joi.string().uri()).min(1).required()
});

const updateHistorySchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    images: Joi.array().items(Joi.string().uri()).optional()
});

const deleteHistorySchema = Joi.object({
    id: Joi.string().required(),
});


module.exports = {
    createHistorySchema,
    updateHistorySchema,
    deleteHistorySchema,
};
