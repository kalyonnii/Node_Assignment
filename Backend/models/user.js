const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    trim: true,
    match: [/^[0-9]{10}$/, 'Phone number must be 10 digits'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  profileImage: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [6, 'Password must be at least 6 characters long'],
  },
  role: {
    type: String,
    enum: ['Admin', 'User', 'admin', 'user'],
    default: 'admin',
  }
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
  try {
    console.log('Before conversion:', this.role);
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    this.role = this.role.toLowerCase();
    console.log('After conversion:', this.role);
    return next();
  } catch (err) {
    return next(err);
  }
});


// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = mongoose.model('User', userSchema);
