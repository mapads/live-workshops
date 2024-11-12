// server/index.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
// Routes
const goalRoutes = require('./routes/goalRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();
const PORT = 5002;

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use('/api', applicationRoutes);
app.use('/api', goalRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));