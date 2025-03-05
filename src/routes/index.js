const express = require('express');
const adminRoutes = require('../routes/admin.route');
const functionRoutes = require('../routes/function.route');

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/function', functionRoutes);

module.exports = router;
