const express = require('express');
const validate = require('../middlewares/validate');
const homeValidation = require('../../src/validations/home.validation');
const homeController = require('../../src/controller/home.controller');
const authMiddleware = require('../middlewares/auth');


const router = express.Router();


router.post('/home',  authMiddleware, validate(homeValidation.createHomeSchema), homeController.createHome);

router.post('/updatehome', authMiddleware,  validate(homeValidation.updateHomeSchema), homeController.updateHome);

router.delete('/home', authMiddleware, validate(homeValidation.deleteHomeSchema), homeController.deleteHome);

router.get('/home', homeController.getAllHomes);

module.exports = router;