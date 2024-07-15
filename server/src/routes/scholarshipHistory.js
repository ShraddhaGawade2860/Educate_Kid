// routes/scholarship.js
const express = require('express');
const router = express.Router();
const Scholarship = require('../models/scholarship');
const FormData = require('../models/FormData');
const User = require('../models/user');

// Get scholarship history by email
router.get('/scholarship-history/:email', async (req, res) => {
  try {
    const email = req.params.email;
    console.log(email);
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const applications = await FormData.find({email: user.email});
    console.log('data is: ',applications);
    if (applications.length === 0) {
      return res.status(404).json({ msg: 'No scholarship applications found for this user' });
    }

    res.json(applications);
  } catch (error) {
    console.error('Error fetching scholarship history:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
