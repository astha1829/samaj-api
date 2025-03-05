    const express = require('express');
    const validate = require('../middlewares/validate');
    const historyValidation = require('../../src/validations/history.validation');
    const historyController = require('../../src/controller/history.controller');
    const authMiddleware = require('../middlewares/auth');

    const router = express.Router();

    

   router.post('/histories',authMiddleware, validate(historyValidation.createHistorySchema), historyController.createHistory);

    router.post('/edit-histories', authMiddleware, validate(historyValidation.updateHistorySchema), historyController.updateHistory);

    router.delete('/histories', authMiddleware, validate(historyValidation.deleteHistorySchema), historyController.deleteHistory);

    router.get('/histories', historyController.getAllHistories);

    module.exports = router;