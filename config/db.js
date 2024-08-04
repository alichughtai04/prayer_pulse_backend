const mongoose = require('mongoose');

const uri = "mongodb+srv://aachughtai2k4:9377Chels!0@cluster0.ttuzf7g.mongodb.net/PrayerPulse?retryWrites=true&w=majority&appName=Cluster0";


const connectDB = async () => {
    try {
        await mongoose.connect(uri, {    
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);    
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;

