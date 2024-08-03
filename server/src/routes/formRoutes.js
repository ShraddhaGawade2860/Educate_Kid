const express = require('express');
const multer = require('multer');
const path = require('path');
const FormData = require('../models/FormData');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.post('/submit', upload.fields([
    { name: 'disabilityCertificate', maxCount: 1 },
    { name: 'xthMarksheet', maxCount: 1 },
    { name: 'xiithMarksheet', maxCount: 1 },
    { name: 'ugCertificate', maxCount: 1 },
    { name: 'pgCertificate', maxCount: 1 },
    { name: 'birthCertificate', maxCount: 1 },
    { name: 'communityCertificate', maxCount: 1 },
    { name: 'aadharCard', maxCount: 1 },
    { name: 'idCard', maxCount: 1 },
    { name: 'feeReceipt', maxCount: 1 }
]), async (req, res) => {
    const formData = req.body;
    const files = req.files;

    try {
        const newFormData = new FormData({
            ...formData,
            disabilityCertificate: files.disabilityCertificate ? files.disabilityCertificate[0].path : null,
            xthMarksheet: files.xthMarksheet ? files.xthMarksheet[0].path : null,
            xiithMarksheet: files.xiithMarksheet ? files.xiithMarksheet[0].path : null,
            ugCertificate: files.ugCertificate ? files.ugCertificate[0].path : null,
            pgCertificate: files.pgCertificate ? files.pgCertificate[0].path : null,
            birthCertificate: files.birthCertificate ? files.birthCertificate[0].path : null,
            communityCertificate: files.communityCertificate ? files.communityCertificate[0].path : null,
            aadharCard: files.aadharCard ? files.aadharCard[0].path : null,
            idCard: files.idCard ? files.idCard[0].path : null,
            feeReceipt: files.feeReceipt ? files.feeReceipt[0].path : null
        });

        await newFormData.save();

        res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error saving form data', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Endpoint to get application counts for each scholarship for a specific institute
router.get('/api/scholarships/application-counts/:instituteName', async (req, res) => {
    try {
      const instituteName = decodeURIComponent(req.params.instituteName);
      const counts = await FormData.aggregate([
        { $match: { institutionName: instituteName } },
        { $group: { _id: "$scholarshipName", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
  
      console.log('Counts retrieved:', counts); // Debugging line
      res.json(counts);
    } catch (error) {
      console.error('Error fetching scholarship application counts:', error);
      res.status(500).send('Server Error');
    }
});


module.exports = router;
