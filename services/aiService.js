// services/aiService.js
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file
const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

async function generateContent(prompt) {
    // Replace this with the actual method to call the Gemini API or your AI model
    const result = await model.generateContent(prompt);
    // Assuming `result` has a `response` field containing the response object
    const response = await result.response;
    // Convert the response to text (adjust based on your actual API response structure)
    const text = await response.text();
    return text;
}

module.exports = {
    generateContent
};
