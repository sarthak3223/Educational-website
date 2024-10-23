const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path'); // Import path to work with file paths
const authRoutes = require('C:/Users/Sarth/educational/routes/authroutes.js');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb://localhost:27017/educational_website'; // MongoDB URI

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Serve static files from the css directory
app.use('/css', express.static(path.join(__dirname, 'css'))); // Serve all CSS files in the css directory

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Use the routes
app.use('/api/auth', authRoutes);

// Define routes for serving each HTML file using absolute paths
app.get('/', (req, res) => {
    res.sendFile(path.join('C:/Users/Sarth/educational/index.html')); // Serve index.html
});

app.get('/login', (req, res) => {
  res.sendFile(path.join('C:/Users/Sarth/educational/login.html')); // Serve login.html
});


app.get('/signup', (req, res) => {
    res.sendFile(path.join('C:/Users/Sarth/educational/signup.html')); // Serve signup.html
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join('C:/Users/Sarth/educational/dashboard.html')); // Serve dashboard.html
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
