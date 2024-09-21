const express = require('express');
const router = express.Router();
const FormData = require('../models/FormData');

// Fetch counts of forms for a specific institute
router.get('/institute/:instituteName/counts', async (req, res) => {
  try {
    const instituteName = decodeURIComponent(req.params.instituteName);

    const pendingCount = await FormData.countDocuments({ institutionName: instituteName, instituteVerified: 0 });
    const verifiedCount = await FormData.countDocuments({ institutionName: instituteName, instituteVerified: 1 });
    const rejectedCount = await FormData.countDocuments({ institutionName: instituteName, instituteVerified: 2 });

    res.json({ pending: pendingCount, verified: verifiedCount, rejected: rejectedCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching form counts' });
  }
});

// Fetch detailed counts based on home state and other state verification statuses
router.get('/institute/:instituteName/verification-details', async (req, res) => {
  try {
    const instituteName = decodeURIComponent(req.params.instituteName);

    // Home state verification
    const homePendingCount = await FormData.countDocuments({ institutionName: instituteName, homeStateVerified: 0 });
    const homeApprovedCount = await FormData.countDocuments({ institutionName: instituteName, homeStateVerified: 1 });
    const homeRejectedCount = await FormData.countDocuments({ institutionName: instituteName, homeStateVerified: 2 });

    // Other state verification
    const otherPendingCount = await FormData.countDocuments({ institutionName: instituteName, otherStateVerified: 0 });
    const otherApprovedCount = await FormData.countDocuments({ institutionName: instituteName, otherStateVerified: 1 });
    const otherRejectedCount = await FormData.countDocuments({ institutionName: instituteName, otherStateVerified: 2 });

    res.json({
      homePending: homePendingCount,
      homeApproved: homeApprovedCount,
      homeRejected: homeRejectedCount,
      otherPending: otherPendingCount,
      otherApproved: otherApprovedCount,
      otherRejected: otherRejectedCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching detailed verification counts' });
  }
});

module.exports = router;
