const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const studentRoutes = require('./routes/students');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/students', studentRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('✅ Server running on port 5000')))
  .catch(err => console.log('❌ DB Error:', err));

