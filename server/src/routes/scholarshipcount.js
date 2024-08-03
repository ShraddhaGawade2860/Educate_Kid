const express = require('express');
const router = express.Router();
const Scholarship = require('../models/scholarship');
const FormData = require('../models/FormData');


router.get('/count', async (req, res) => {
  try {
    const count = await Scholarship.countDocuments();
    console.log(count);
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Endpoint to fetch scholarship application counts
router.get('/application-counts', async (req, res) => {
  try {
    const counts = await FormData.aggregate([
      { $group: { _id: '$scholarshipName', count: { $sum: 1 } } },
      { $sort: { count: -1 } } // Sort by the count in descending order
    ]);

    res.status(200).json(counts);
  } catch (error) {
    console.error('Error fetching scholarship application counts:', error);
    res.status(500).json('Failed to fetch scholarship application counts');
  }
});





module.exports = router;

