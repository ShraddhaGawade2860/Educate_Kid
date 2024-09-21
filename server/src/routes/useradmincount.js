const express = require('express');
const router = express.Router();
const FormData = require('../models/FormData');

// Fetch counts for home state
router.get('/state/:state/counts', async (req, res) => {
  try {
    const state = decodeURIComponent(req.params.state);

    // Count pending forms by home state
    const pendingByHomeState = await FormData.countDocuments({
      state: state,
      homeStateVerified: 0
    });

    // Count approved forms by home state
    const approvedByHomeState = await FormData.countDocuments({
      state: state,
      homeStateVerified: 1
    });

    // Count rejected forms by home state
    const rejectedByHomeState = await FormData.countDocuments({
      state: state,
      homeStateVerified: 2
    });

    // Count pending forms by institute
    const pendingByInstitute = await FormData.countDocuments({
      instituteVerified: 0
    });

    // Count approved forms by institute
    const approvedByInstitute = await FormData.countDocuments({
      instituteVerified: 1
    });

    // Count rejected forms by institute
    const rejectedByInstitute = await FormData.countDocuments({
      instituteVerified: 2
    });

    // Count pending forms by other state
    const pendingByOtherState = await FormData.countDocuments({
      state: { $ne: state },
      otherStateVerified: 0
    });

    // Count approved forms by other state
    const approvedByOtherState = await FormData.countDocuments({
      state: { $ne: state },
      otherStateVerified: 1
    });

    // Count rejected forms by other state
    const rejectedByOtherState = await FormData.countDocuments({
      state: { $ne: state },
      otherStateVerified: 2
    });

    res.json({
      pendingByHomeState,
      approvedByHomeState,
      rejectedByHomeState,
      pendingByInstitute,
      approvedByInstitute,
      rejectedByInstitute,
      pendingByOtherState,
      approvedByOtherState,
      rejectedByOtherState
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching counts for the state' });
  }
});

// Fetch pending forms by state
router.get('/state/:state/pending', async (req, res) => {
  try {
    const state = decodeURIComponent(req.params.state);
    
    const forms = await FormData.find({
      state: state,
      homeStateVerified: 0 // Pending status
    });

    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forms for the state' });
  }
});

module.exports = router;
