const Joi = require('joi');


const createUpcomingEventSchema = Joi.object({
    title: Joi.string().required(),
    images: Joi.array().items(Joi.string()).min(1).required(),
    description: Joi.string().required(),
    dateTime: Joi.object({
        date: Joi.string().required(),
        time: Joi.string().required()
    }).required(),
    contactPerson: Joi.object({
        name: Joi.string().required(),
        number: Joi.string().required()
    }).required()
});

const updateUpcomingEventSchema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().optional(),
    images: Joi.array().items(Joi.string()).optional(),
    description: Joi.string().optional(),
    dateTime: Joi.object({
        date: Joi.string().optional(),
        time: Joi.string().optional()
    }).optional(),
    contactPerson: Joi.object({
        name: Joi.string().optional(),
        number: Joi.string().optional()
    }).optional()
}).min(1); 


const deleteUpcomingEventSchema = Joi.object({
    id: Joi.string().required()
});


module.exports = {
    createUpcomingEventSchema,
    updateUpcomingEventSchema,
    deleteUpcomingEventSchema
};
