const express = require('express');
const cors = require('cors'); // Import cors package

const userRoutes = require('./routes/register');
const chatRoutes = require('./routes/chatRoutes');
const prayerRoutes = require('./routes/prayerRoutes');
const loginRoutes = require('./routes/loginRoutes')
const  connectDB  = require('./config/db');

const app = express();
const port = 3000;



app.use(cors()); // Use CORS middleware to allow cross-origin requests
app.use(express.json());

connectDB();
app.use('/api/', userRoutes);
app.use('/api/', chatRoutes)
app.use('/api', prayerRoutes)
app.use('/api/', loginRoutes )






















// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
