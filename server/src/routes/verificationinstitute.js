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

// Fetch forms for a specific institute
router.get('/institute/:instituteName', async (req, res) => {
  try {
    const instituteName = decodeURIComponent(req.params.instituteName);
    const forms = await FormData.find({ institutionName: instituteName, instituteVerified: 0 });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forms for the institute' });
  }
});

// Fetch form by ID
router.get('/:formId', async (req, res) => {
  try {
    const form = await FormData.findById(req.params.formId);
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching form data' });
  }
});

// Approve form
router.put('/approve/:formId', async (req, res) => {
  try {
    const form = await FormData.findByIdAndUpdate(req.params.formId, { instituteVerified: 1 }, { new: true });
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: 'Error approving form' });
  }
});

// Reject form
router.put('/reject/:formId', async (req, res) => {
  const { rejectReason } = req.body;
  try {
    const form = await FormData.findByIdAndUpdate(req.params.formId, { instituteVerified: 2, finalStatus: 2,  rejectReason: rejectReason }, { new: true });
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting form' });
  }
});


// Fetch pending forms for a specific institute
router.get('/api/institute/:name/pending', async (req, res) => {
  try {
    const instituteName = decodeURIComponent(req.params.instituteName);
    const pendingForms = await FormData.find({ institutionName: instituteName, instituteVerified: 0 });
    res.json(pendingForms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending forms for the institute' });
  }
});

module.exports = router;
