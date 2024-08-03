// studenthistory.js
const express = require('express');
const router = express.Router();
const FormData = require('../models/FormData');

// Fetch student forms based on state
router.get('/state/:state', async (req, res) => {
  try {
    const state = decodeURIComponent(req.params.state);
    const forms = await FormData.find({ state: state });
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
