const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load configurations
dotenv.config();

// Initialize App
const app = express();

// Connect to MongoDB Database
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Main Endpoint Mounting
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

// Root Status
app.get('/', (req, res) => {
    res.send('Social Media App REST API layer active...');
});

// Launch Express Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running smoothly on port ${PORT}`);
});