const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/authJwt');

// Get profile of the logged-in user
router.get('/profile', [verifyToken], controller.getProfile);

// Update profile of the logged-in user
router.put('/profile', [verifyToken], controller.updateProfile);

// Public profile view
router.get('/:username', controller.getPublicProfile);


module.exports = router;
