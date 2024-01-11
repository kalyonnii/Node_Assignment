const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

// User Authentication
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Delete User (Requires Token Verification)
router.delete('/delete', verifyToken, authController.deleteUser);

module.exports = router;
