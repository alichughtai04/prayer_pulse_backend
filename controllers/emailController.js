// src/controllers/emailController.js
const Email = require('../models/Email'); // Assuming you have an Email model

exports.subscribe = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email already exists
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already subscribed." });
    }

    // Save the email to the database
    const newEmail = new Email({ email });
    await newEmail.save();

    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Error subscribing email:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
