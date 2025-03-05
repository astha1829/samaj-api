const Joi = require('joi');
const pick = require('../utils/pick');

const validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ['body', 'query', 'params']);
    const object = pick(req, Object.keys(validSchema));

    console.log('Request body:', req.body);  // Log the request body
    console.log('Valid schema:', validSchema);  // Log the schema to validate against
    console.log('Object to validate:', object);  // Log the picked object

    const { value, error } = Joi.compile(validSchema)
        .prefs({ allowUnknown: true, stripUnknown: true })
        .validate(object);

    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        console.error('Validation error:', errorMessage);
        return res.status(400).json({
            status: 'error',
            message: errorMessage,
        });
    }

    Object.assign(req, value);
    next();
};

module.exports = validate;
