// routes/prayerTimesRoutes.js
const express = require('express');
const router = express.Router();
const prayerController = require('../controllers/prayerController');

router.get('/prayer-times/:year/:month', prayerController.getPrayerTimes);

module.exports = router;
