const JoiExtended = require('joi').extend(require('joi-phone-number'));

// Define a regular expression for a valid mobile number format.
const mobileNumberPattern = /^[6-9][0-9]{9}$/; // Indian mobile number format.

const createOfficeUserSchema = JoiExtended.object({
    name: JoiExtended.string().required(),
    number: JoiExtended.string().phoneNumber({ defaultCountry: 'IN', format: 'e164' }).pattern(mobileNumberPattern).required().messages({
        'string.pattern.base': 'Invalid mobile number format. Mobile numbers must be 10 digits starting with 6, 7, 8, or 9.',
    }),
    email: JoiExtended.string().email().required(),
    designation: JoiExtended.string().required(),
    profilePicUrls: JoiExtended.alternatives().try(JoiExtended.string(), JoiExtended.array().items(JoiExtended.string().uri())).required(),
    description: JoiExtended.string().required(),
});

const updateOfficeUserSchema = JoiExtended.object({
    id: JoiExtended.string().required(),
    name: JoiExtended.string().optional(),
    number: JoiExtended.string().phoneNumber({ defaultCountry: 'IN', format: 'e164' }).pattern(mobileNumberPattern).optional().messages({
        'string.pattern.base': 'Invalid mobile number format. Mobile numbers must be 10 digits.',
    }),
    email: JoiExtended.string().email().optional(),
    designation: JoiExtended.string().optional(),
    profilePicUrls: JoiExtended.alternatives().try(
        JoiExtended.array().items(JoiExtended.string().uri().optional()),
        JoiExtended.string().uri().optional()
    ).optional().messages({
        'alternatives.match': 'Profile picture URL(s) must be a valid URL or an array of valid URLs.',
    }),
    description: JoiExtended.string().optional(),
});

const deleteOfficeUserSchema = JoiExtended.object({
    id: JoiExtended.string().required()
});

module.exports = {
    createOfficeUserSchema,
    updateOfficeUserSchema,
    deleteOfficeUserSchema,
};
