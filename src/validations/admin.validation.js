const Joi = require('joi');

const createAdmin = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    number: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
};

const loginAdmin = {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  };
  

module.exports = {
  createAdmin,
  loginAdmin
};
