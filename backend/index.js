require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Allow all origins
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to BeatMarket backend API.' });
});

// API Routes
const authRoutes = require('./routes/auth.routes');
const beatRoutes = require('./routes/beat.routes');
const userRoutes = require('./routes/user.routes');

app.use('/api/auth', authRoutes);
app.use('/api/beats', beatRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});