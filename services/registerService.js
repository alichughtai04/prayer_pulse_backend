const User = require('../models/userModel');
const bcrypt = require('bcrypt');

async function registerUser(userData) {
    const { username, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists with this email');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    // Save user to database
    await newUser.save();

    return newUser;
}

module.exports = {
    registerUser
};
