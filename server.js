const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import cors package
const { GoogleGenerativeAI } = require("@google/generative-ai");


const bodyParser = require('body-parser');
const app = express();
const port = 3000;



require('dotenv').config(); // Load environment variables from .env file
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // Use CORS middleware to allow cross-origin requests


const convertMilitaryToRegularTime = (militaryTimes) => {
    const convertTime = (time) => {
      let [hours, minutes] = time.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
  
      hours = hours % 12;
      hours = hours || 12; // Handle midnight (0 hours)
  
      return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
    };
  
    // Process each object in the data array
    return militaryTimes.map((item) => {
      // Convert timings
      const convertedTimings = {};
      for (const [key, value] of Object.entries(item.timings)) {
        convertedTimings[key] = convertTime(value);
      }
  
      // Return the object with converted timings
      return {
        ...item,
        timings: convertedTimings
      };
    });
  };




app.get('/api/prayer-times/:year/:month', async (req, res) => {
  const { year, month } = req.params;
  const { city, country, method } = req.query;

  // Validate query parameters
  if (!city || !country || !method) {
    return res.status(400).json({ error: 'City, country, and method are required query parameters.' });
  }

  try {
    // Construct the request to the Aladhan API
    const response = await axios.get(`http://api.aladhan.com/v1/calendarByCity/${year}/${month}`, {
      params: {
        city: city,
        country: country,
        method: method,
      },
    });
    
    // Send the API response
   
    res.json(response.data);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});




app.post('/chat', async (req, res) => {
    // Extract the prompt from the request body
    const { prompt } = req.body;
  
    // Validate that the prompt is provided
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
  
    try {
      // Replace this with the actual method to call the Gemini API or your AI model
      const result = await model.generateContent(prompt);
  
      // Assuming `result` has a `response` field containing the response object
      const response = await result.response;
  
      // Convert the response to text (adjust based on your actual API response structure)
      const text = response.text();
  
      // Send the response back to the client
      res.json({ reply: text });
    } catch (error) {
      console.error('Error communicating with AI model:', error);
      res.status(500).json({ error: 'Failed to generate response from AI model' });
    }
  });
  









// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
