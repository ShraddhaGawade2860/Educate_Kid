const express = require('express');
const router = express.Router();
const FormData = require('../models/FormData');

// Fetch forms for a specific institute
router.get('/institute/:instituteName', async (req, res) => {
  try {
    const instituteName = decodeURIComponent(req.params.instituteName);
    const forms = await FormData.find({ institutionName: instituteName });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forms for the institute' });
  }
});


module.exports = router;
