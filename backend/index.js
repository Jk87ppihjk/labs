require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Import the database pool
const db = require('./config/db.config');

// Allow all origins
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to BeatMarket backend API.' });
});

// Endpoint to test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    await db.query('SELECT 1 + 1 AS solution');
    res.status(200).send('Database connection successful!');
  } catch (error) {
    console.error('Database connection test failed:', error);
    res.status(500).send('Database connection failed: ' + error.message);
  }
});

// API Routes
const authRoutes = require('./routes/auth.routes');
const beatRoutes = require('./routes/beat.routes');
const userRoutes = require('./routes/user.routes');

app.use('/api/auth', authRoutes);
app.use('/api/beats', beatRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

console.log(`Attempting to start server on port ${PORT}`);
app.listen(PORT, () => {
  console.log(`Server successfully started and listening on port ${PORT}.`);
});