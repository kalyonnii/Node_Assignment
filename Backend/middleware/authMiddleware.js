const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// Verify token
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token =authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    req.user = decoded; // Set the decoded token payload to the request object
    req.userId=decoded.userId
    next();
  });
}

// Check if user is an Admin
function isAdmin(req, res, next) {
  if (req.user.role === 'Admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied. Admin rights required.' });
  }
}

// Check if user is an Admin or User
function isUser(req, res, next) {
  if (req.user.role === 'User' || req.user.role === 'Admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied. User rights required.' });
  }
}

module.exports = { verifyToken, isAdmin, isUser };
