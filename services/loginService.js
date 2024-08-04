// services/authService.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

async function loginUser(email, password) {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password.');
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password.');
    }

    // If successful, return the user (you may want to return a JWT or session info here)
    return user;
}

module.exports = {
    loginUser
};
