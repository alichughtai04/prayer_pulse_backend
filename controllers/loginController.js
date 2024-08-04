// controllers/authController.js
const authService = require('../services/loginService');

async function login(req, res) {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const user = await authService.loginUser(email, password);
        // Respond with user data or a token (you may want to generate a JWT here)
        res.json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(401).json({ error: error.message });
    }
}

module.exports = {
    login
};
