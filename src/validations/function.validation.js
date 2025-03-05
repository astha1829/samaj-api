const Joi = require('joi');

const createFunctionSchema = Joi.object({
  Name: Joi.string().required(),
  Price: Joi.number().required()
});

const updateFunctionSchema = {
  query: Joi.object({
    functionId: Joi.string().required() 
  }),
  body: Joi.object({
    Name: Joi.string(),
    Price: Joi.number()
  }).min(1) 
};


const deleteFunctionSchema = {
  query: Joi.object({
    functionId: Joi.string().required() 
  })
};

module.exports = {
  createFunctionSchema,
  updateFunctionSchema,
  deleteFunctionSchema
};
