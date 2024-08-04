// services/prayerTimesService.js
const axios = require('axios');

async function getPrayerTimes(year, month, city, country, method) {
    const response = await axios.get(`http://api.aladhan.com/v1/calendarByCity/${year}/${month}`, {
        params: {
            city: city,
            country: country,
            method: method,
        },
    });
    return response.data;
}

module.exports = {
    getPrayerTimes
};
