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

module.exports = router;
