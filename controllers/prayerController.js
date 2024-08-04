// controllers/prayerTimesController.js
const prayerTimesService = require('../services/prayerService');

async function getPrayerTimes(req, res) {
    const { year, month } = req.params;
    const { city, country, method } = req.query;

    // Validate query parameters
    if (!city || !country || !method) {
        return res.status(400).json({ error: 'City, country, and method are required query parameters.' });
    }

    try {
        const prayerTimes = await prayerTimesService.getPrayerTimes(year, month, city, country, method);
        res.json(prayerTimes);
    } catch (error) {
        console.error('Error fetching prayer times:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getPrayerTimes
};
