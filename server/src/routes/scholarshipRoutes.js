const express = require('express');
const router = express.Router();
const multer = require('multer');
const Scholarship = require('../models/scholarship');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination directory for logo uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
  }
});

const upload = multer({ storage: storage });

// Endpoint to add a new scholarship
router.post('/', upload.single('logo'), async (req, res) => {
  try {
    const scholarshipData = {
      ...req.body,
      logo: req.file ? req.file.path : null // Store the path to the uploaded logo
    };

    const newScholarship = new Scholarship(scholarshipData);
    await newScholarship.save();

    res.status(200).json({ message: 'Scholarship added successfully' });
  } catch (error) {
    console.error('Error adding scholarship:', error);
    res.status(500).json({ message: 'Failed to add scholarship' });
  }
});

// Endpoint to fetch scholarships based on criteria
router.get('/', async (req, res) => {
  const { classSelection, genderSelection, stateSelection, typeSelection } = req.query;
  try {
    const scholarships = await Scholarship.find({
      class: classSelection,
      gender: genderSelection,
      state: stateSelection,
      type: typeSelection

    });
    res.status(200).json(scholarships);
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    res.status(500).json('Failed to fetch scholarships');
  }
});

//Endpoint to fetch scholarship details by ID
router.get('/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    res.status(200).json(scholarship);
  } catch (error) {
    console.error('Error fetching scholarship details:', error);
    res.status(500).json('Failed to fetch scholarship details');
  }
});


// Endpoint to fetch scholarships based on state
/*router.get('/', async (req, res) => {
  const { state } = req.query;
  try {
    const scholarships = await Scholarship.find({ state: state });
    res.status(200).json(scholarships);
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    res.status(500).json('Failed to fetch scholarships');
  }
});*/


// Endpoint to fetch scholarships added by a specific state admin
router.get('/bystate/:state', async (req, res) => {
  const { state } = req.params;
  try {
    const scholarships = await Scholarship.find({ state: state });
    res.status(200).json(scholarships);
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    res.status(500).json('Failed to fetch scholarships');
  }
});

router.get('/count', async (req, res) => {
  try {
    const count = await Scholarship.countDocuments();
    console.log(count);
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;


