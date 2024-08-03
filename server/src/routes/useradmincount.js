const express = require('express');
const router = express.Router();
const FormData = require('../models/FormData');

// Fetch counts for home state
router.get('/state/:state/counts', async (req, res) => {
  try {
    const state = decodeURIComponent(req.params.state);

    // Count pending forms
    const pendingCount = await FormData.countDocuments({
      state: state,
      instituteVerified: 1,
      homeStateVerified: 0
    });

    // Count rejected forms
    const rejectedCount = await FormData.countDocuments({
      state: state,
      homeStateVerified: 2
    });

    // Count verified forms
    const verifiedCount = await FormData.countDocuments({
      state: state,
      homeStateVerified: 1
    });

    res.json({
      pending: pendingCount,
      rejected: rejectedCount,
      verified: verifiedCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching counts for the state' });
  }
});

// Other routes remain unchanged


// Fetch pending forms by state
router.get('/state/:state', async (req, res) => {
  try {
    const state = decodeURIComponent(req.params.state);
    
    const forms = await FormData.find({
      state: state,
      instituteVerified: 1,
      homeStateVerified: 0 // Pending status
    });

    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forms for the state' });
  }
});



module.exports = router;
