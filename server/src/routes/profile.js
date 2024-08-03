const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const User = require('../models/user');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.put('/users/:id', upload.single('profileImage'), async (req, res) => {
  console.log('Received PUT request for user ID:', req.params.id); // Debug statement

  try {
    const updateFields = { ...req.body };
    if (req.file) {
      updateFields.profileImage = req.file.filename;
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});


/*router.put('/users/:id', async (req, res) => {
  console.log('Received PUT request for user ID:', req.params.id); // Debug statement
  try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
          return res.status(404).json({ msg: 'User not found' });
      }
      res.json(updatedUser);
  } catch (err) {
      res.status(500).json({ msg: 'Server error', error: err.message });
  }
});*/
module.exports = router;
