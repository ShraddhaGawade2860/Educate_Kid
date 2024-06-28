const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register
router.post('/register', async (req, res) => {
    const { name, email, contactnumber, password, state, institutename } = req.body;
    try {
        if (!name || !email || !contactnumber || !password) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            contactnumber,
            password: hashedPassword,
            role: 1, // Role 1 for institute
            state,
            institutename,
            verified: false // New field for verification status
        });
        await user.save();
        res.status(201).json({ msg: 'Institute registration request sent for verification' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

// Admin - Get all institute requests
router.get('/admin/institutes', async (req, res) => {
    try {
        const institutes = await User.find({ role: 1, verified: false }).select('-password');
        res.json(institutes);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Admin - Approve institute request
router.put('/admin/approve/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'Institute not found' });
        }
        user.verified = true;
        await user.save();
        res.json({ msg: 'Institute approved' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
