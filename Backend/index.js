const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const { verifyToken } = require('./middleware/authMiddleware');
const { MONGODB_URI } = require('./config');
const { JWT_SECRET } = require('./config');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

  //test 
  app.get('/hello', (req, res)=>{
    res.send("Hello Node Js development!!")
  })

  //JWT TOKEN
  app.post('/login',(req, res)=>{
const username =req.body.username
const user={name:username}
const accessToken =jwt.sign(user,JWT_SECRET)
res.json({accessToken:accessToken})
  })

// Routes
app.use('/auth', authRoutes);
app.use('/user', verifyToken, userRoutes);

app.use('/profiles', express.static('uploads/profiles'));



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
