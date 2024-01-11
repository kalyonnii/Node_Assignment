// config.js

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://admin:admin123@cluster0.hrhuaiu.mongodb.net/User_Management?retryWrites=true&w=majority",
    JWT_SECRET: process.env.JWT_SECRET || 'KBaAlAyVoAnInLiOiVEYOU',
  };
  