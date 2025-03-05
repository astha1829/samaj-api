const express = require('express');
const validate = require('../middlewares/validate');
const adminValidation = require('../../src/validations/admin.validation');
const adminController = require('../../src/controller/admin.controller');

const router = express.Router();

router.post('/admins', validate(adminValidation.createAdmin), adminController.registerAdmin);
router.post('/login', validate(adminValidation.loginAdmin), adminController.loginAdmin);

module.exports = router;