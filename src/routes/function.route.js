const express = require('express');
const validate = require('../middlewares/validate');
const functionValidation = require('../../src/validations/function.validation');
const functionController = require('../../src/controller/function.controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.post('/function', authMiddleware, validate(functionValidation.createFunctionSchema), functionController.createFunction);
router.post('/edit-function', authMiddleware, validate(functionValidation.updateFunctionSchema), functionController.updateFunction);
router.delete('/function', authMiddleware, validate(functionValidation.deleteFunctionSchema), functionController.deleteFunction);
router.get('/function', functionController.getAllFunction);

module.exports = router;
