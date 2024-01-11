const User = require('../models/user');

// Get user details by ID (User's own details)
async function getUserDetails(req, res) {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Modify user details by ID (User's own details)
async function modifyUserDetails(req, res) {
  const userId = req.params.id;
  const { name, profileImage } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, profileImage },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete user by ID (User's own account)
async function deleteUser(req, res) {
  const userId = req.params.id;

  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get user details by ID (Admin access)
async function getAdminUserDetails(req, res) {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Modify user details by ID (Admin access)
async function modifyAdminUserDetails(req, res) {
  const userId = req.params.id;
  const { name, profileImage } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, profileImage },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete user by ID (Admin access)
async function deleteAdminUser(req, res) {
  const userId = req.params.id;

  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//profile image
async function uploadProfileImage(req, res) {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assuming multer middleware saves the file details in req.file
    user.profileImage = req.file.filename;
    await user.save();

    res.status(200).json({ message: 'Profile image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    res.status(500).json({ message: 'Error uploading profile image', error: error.message });
  }
};

module.exports = {
  getUserDetails,
  modifyUserDetails,
  deleteUser,
  getAdminUserDetails,
  modifyAdminUserDetails,
  deleteAdminUser,
  uploadProfileImage
};
