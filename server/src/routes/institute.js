const express = require('express');
const router = express.Router();
const Institute = require('../models/institute');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Institute Registration
router.post('/register', async (req, res) => {
    const { name, email, contactnumber, password, state } = req.body;
    try {
        if (!name || !email || !contactnumber || !password || !state) {
            return res.status(400).json({ msg: 'All fields are required' });
        }
        
        const existingInstitute = await Institute.findOne({ email });
        if (existingInstitute) {
            return res.status(400).json({ msg: 'Email already in use' });
        }
        
        const institute = new Institute({ name, email, contactnumber, password, state });
        await institute.save();
        res.status(201).json({ msg: 'Institute registered successfully' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

// Institute Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const institute = await Institute.findOne({ email });
        if (!institute) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await institute.comparePassword(password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: institute._id }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
