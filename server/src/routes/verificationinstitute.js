const express = require('express');
const router = express.Router();
const Form = require('../models/FormData'); // Adjust the model import based on your setup

// Middleware to get institute information
const getInstitute = (req, res, next) => {
  // Assuming you have the user information stored in req.user
  // You might get this information from a decoded JWT token or session
  req.instituteName = req.user ? req.user.name : 'InstituteName'; // Replace with the actual way of getting the institute name
  next();
};

// Route to fetch forms for institute approval
router.get('/institute', getInstitute, async (req, res) => {
  const instituteName = req.instituteName; // Assuming institute name is stored in req.user
  try {
    const forms = await Form.find({ institutionName: instituteName, status: 'pending' });
    res.status(200).json(forms);
  } catch (error) {
    console.error('Error fetching forms for institute:', error);
    res.status(500).json({ message: 'Failed to fetch forms' });
  }
});

// Route to approve a form
router.put('/approve/:id', async (req, res) => {
  const formId = req.params.id;
  try {
    const updatedForm = await Form.findByIdAndUpdate(formId, { status: 'approved' }, { new: true });
    res.status(200).json(updatedForm);
  } catch (error) {
    console.error('Error approving form:', error);
    res.status(500).json({ message: 'Failed to approve form' });
  }
});

// Route to reject a form
router.put('/reject/:id', async (req, res) => {
  const formId = req.params.id;
  try {
    const updatedForm = await Form.findByIdAndUpdate(formId, { status: 'rejected' }, { new: true });
    res.status(200).json(updatedForm);
  } catch (error) {
    console.error('Error rejecting form:', error);
    res.status(500).json({ message: 'Failed to reject form' });
  }
});

module.exports = router;
