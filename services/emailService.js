// src/services/emailService.js
const Email = require('../models/Email');

exports.saveEmail = async (email) => {
  const existingEmail = await Email.findOne({ email });
  if (existingEmail) {
    throw new Error("Email is already subscribed.");
  }

  const newEmail = new Email({ email });
  return await newEmail.save();
};
