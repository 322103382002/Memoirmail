const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes
app.use('/api/auth', authRoutes);
app.get('/', (req,res) => {
  res.send('Welcome to the Video Upload API');
});
app.use('/api/image',imageRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
})
.catch(err => {
  console.error('MongoDB connection failed:', err.message);
});

