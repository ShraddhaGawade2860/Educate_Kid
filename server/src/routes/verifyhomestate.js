const express = require('express');
const router = express.Router();
const FormData = require('../models/FormData');

// Fetch forms by state and status for home state
router.get('/state/:state', async (req, res) => {
  try {
    const state = decodeURIComponent(req.params.state);
    const status = req.query.status;
    let forms;

    // Filter forms based on status query parameter
    if (status === 'pending') {
      forms = await FormData.find({
        state: state,
        instituteVerified: 1,
        homeStateVerified: 0 // Exclude approved (1) and rejected (2)
      });
    } else if (status === 'rejected') {
      forms = await FormData.find({ state: state, homeStateVerified: 2 });
    } else if (status === 'verified') {
      forms = await FormData.find({ state: state, homeStateVerified: 1 });
    } else {
      // Default to pending if status is not specified or invalid
      forms = await FormData.find({
        state: state,
        instituteVerified: 1,
        homeStateVerified: 0 // Exclude approved (1) and rejected (2)
      });
    }

    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forms for the state' });
  }
});


// Fetch a single form by formId
router.get('/:formId', async (req, res) => {
  try {
    const formId = req.params.formId;
    const form = await FormData.findById(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching form data' });
  }
});

// Approve a form for home state
router.put('/:formId/approve', async (req, res) => {
  try {
    const formId = req.params.formId;
    const form = await FormData.findById(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    form.homeStateVerified = 1; // Mark as approved
    await form.save();
    
    res.status(200).json({ message: 'Form approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving form' });
  }
});

// Reject a form for home state with reason
router.put('/:formId/reject', async (req, res) => {
  try {
    const formId = req.params.formId;
    const { rejectReason } = req.body;
    
    const form = await FormData.findById(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    form.homeStateVerified = 2; // Mark as rejected
    form.rejectReason = rejectReason; // Save reject reason
    await form.save();
    
    res.status(200).json({ message: 'Form rejected successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting form' });
  }
});

// Approve a form for other state
router.put('/otherstate/:formId/approve', async (req, res) => {
  try {
    const formId = req.params.formId;
    const form = await FormData.findById(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    form.otherStateVerified = 1; // Mark as approved
    await form.save();
    
    res.status(200).json({ message: 'Form approved successfully for other state' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving form for other state' });
  }
});

// Reject a form for other state with reason
router.put('/otherstate/:formId/reject', async (req, res) => {
  try {
    const formId = req.params.formId;
    const { rejectReason } = req.body;
    
    const form = await FormData.findById(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    form.otherStateVerified = 2; // Mark as rejected
    form.rejectReason = rejectReason; // Save reject reason
    await form.save();
    
    res.status(200).json({ message: 'Form rejected successfully for other state' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting form for other state' });
  }
});

module.exports = router;
