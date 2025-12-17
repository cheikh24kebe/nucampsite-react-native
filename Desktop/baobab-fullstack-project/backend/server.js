// Update server.js to add routes
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));

// Test route
app.get('/api', (req, res) => {
  res.json({ message: 'Baobab Restaurant API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});