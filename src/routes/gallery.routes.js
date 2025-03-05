const express = require('express');
const validate = require('../middlewares/validate');
const galleryValidation = require('../../src/validations/gallery.validation');
const galleryController = require('../../src/controller/gallery.controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();


router.post('/gallery',authMiddleware ,validate(galleryValidation.createGallerySchema), galleryController.createGallery);

router.post('/update-gallery', authMiddleware, validate(galleryValidation.updateGallerySchema), galleryController.updateGallery);

router.delete('/delete-gallery', authMiddleware, validate(galleryValidation.deleteGallerySchema), galleryController.deleteGallery);

router.get('/galleries', galleryController.getAllGalleries);


module.exports = router;
