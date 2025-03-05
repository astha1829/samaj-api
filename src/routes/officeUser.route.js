const express = require('express');
const validate = require('../middlewares/validate');
const officeUserValidation = require('../../src/validations/officeUser.validation');
const officeUserController = require('../../src/controller/officeUser.controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();


router.post('/office-users', authMiddleware, validate(officeUserValidation.createOfficeUserSchema), officeUserController.createOfficeUser);
router.post('/edit-officeusers', authMiddleware,  validate(officeUserValidation.updateOfficeUserSchema), officeUserController.updateOfficeUser);
router.delete('/office-users', authMiddleware, validate(officeUserValidation.deleteOfficeUserSchema), officeUserController.deleteOfficeUser);
router.get('/office-users', officeUserController.getAllOfficeUsers);

module.exports = router;
