const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const studentRoutes = require('./routes/students');

dotenv.config();
const app = express();

// Configure CORS to allow requests only from the Vercel frontend
app.use(cors({
  origin: 'https://student-management-system-ja3b.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use('/students', studentRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ Connected to MongoDB');
    // Use the PORT environment variable provided by Render, fallback to 5000 for local dev
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`✅ Server running on port ${port}`));
  })
  .catch(err => {
    console.error('❌ DB Connection Error:', err.message);
    process.exit(1); // Exit the process if the database connection fails
  });

// Basic health check endpoint (optional, for debugging)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Backend server is running' });
});