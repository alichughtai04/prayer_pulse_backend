const userService = require('../services/registerService');

async function register(req, res) {
    try {
        const userData = req.body;
        const newUser = await userService.registerUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    register
};
