const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');


// Signup a new user
async function signup(req, res) {
  const { email, phone, name, profileImage, password } = req.body;
  if (!email && !phone) {
    return res.status(400).json({ message: 'Email or phone is required.' });
  }

  try {
    const newUser = await User.create({
      email,
      phone,
      name,
      profileImage,
      password,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Login existing user
async function login(req, res) {
  const { emailOrPhone, password } = req.body;
  
  try {
    const user = await User.find({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
     
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
   
    const token = jwt.sign({ userId: user[0]._id, role: user[0].role }, JWT_SECRET, {
      expiresIn: '1h',
      
    });
    
    localStorage.setItem("Token", token )
    res.status(200).json({ token });
    console.log("Login successfully")
  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete user account
async function deleteUser(req, res) {
  const userId = req.user.userId; // Assuming userId is decoded from the token

  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { signup, login, deleteUser };
