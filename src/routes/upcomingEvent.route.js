const express = require('express');
const validate = require('../middlewares/validate');
const upcomingEventValidation = require('../../src/validations/upcomingEvent.validation');
const upcomingEventController = require('../../src/controller/upcomingEvent.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();



router.post('/upcoming-events',  authMiddleware,validate(upcomingEventValidation.createUpcomingEventSchema), upcomingEventController.createUpcomingEvent);
router.post('/edit-upcomingevents', authMiddleware,  validate(upcomingEventValidation.updateUpcomingEventSchema), upcomingEventController.updateUpcomingEvent);
router.delete('/upcoming-events', authMiddleware, validate(upcomingEventValidation.deleteUpcomingEventSchema), upcomingEventController.deleteUpcomingEvent);
router.get('/upcoming-events', upcomingEventController.getAllUpcomingEvents);

module.exports = router;
