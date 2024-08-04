// controllers/chatController.js
const aiService = require('../services/aiService');

async function chat(req, res) {
    const { prompt } = req.body;
  
    // Validate that the prompt is provided
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }
  
    try {
        const reply = await aiService.generateContent(prompt);
        res.json({ reply });
    } catch (error) {
        console.error('Error communicating with AI model:', error);
        res.status(500).json({ error: 'Failed to generate response from AI model' });
    }
}

module.exports = {
    chat
};
