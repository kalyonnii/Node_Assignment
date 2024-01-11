const express = require("express");
const router = express.Router();
const multer = require("multer");
const userController = require("../controllers/userController");
const {
  verifyToken,
  isAdmin,
  isUser,
} = require("../middleware/authMiddleware");

//profile image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/profiles");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Image upload endpoint
router.post(
  "/upload",
  verifyToken,
  upload.single("profileImage"),
  userController.uploadProfileImage
);



// Get user details by ID
router.get("/:id", verifyToken, isUser, userController.getUserDetails);

// Modify user details by ID
router.put("/:id", verifyToken, isUser, userController.modifyUserDetails);

// Delete user by ID
router.delete("/:id", verifyToken, isUser, userController.deleteUser);

// Admin routes
router.get(
  "/:id/admin",
  verifyToken,
  isAdmin,
  userController.getAdminUserDetails
);
router.put(
  "/:id/admin",
  verifyToken,
  isAdmin,
  userController.modifyAdminUserDetails
);
router.delete(
  "/:id/admin",
  verifyToken,
  isAdmin,
  userController.deleteAdminUser
);

module.exports = router;
