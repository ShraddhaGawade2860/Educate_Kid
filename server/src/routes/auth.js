const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Register route
router.post('/register', upload.fields([
    { name: 'instituteCertificate', maxCount: 1 },
    { name: 'accreditationCertificate', maxCount: 1 },
    { name: 'affiliationCertificate', maxCount: 1 }
]), async (req, res) => {
    try {
        const { name, email, contactnumber, password, role, state, institutecode, verified, gender } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            name,
            email,
            contactnumber,
            password: hashedPassword,
            role,
            state,
            institutecode,
            verified,
            gender, 
            instituteCertificate: req.files.instituteCertificate ? req.files.instituteCertificate[0].path : '',
            accreditationCertificate: req.files.accreditationCertificate ? req.files.accreditationCertificate[0].path : '',
            affiliationCertificate: req.files.affiliationCertificate ? req.files.affiliationCertificate[0].path : ''
        });

        await user.save();
        res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { identifier, password } = req.body;
        let user;

        if (identifier.includes('@')) {
            user = await User.findOne({ email: identifier });
        } else {
            user = await User.findOne({ state: identifier, role: 2 });
        }

        if (!user) return res.status(400).json({ msg: "User does not exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        if (user.role === 1 && !user.verified) {
            return res.status(400).json({
                msg: user.rejected ?
                    "Admin rejected your form, please register again with correct information." :
                    "Your account is pending admin approval. Please wait for verification."
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({
            token,
            id: user._id,
            name: user.name,
            email: user.email,
            contactnumber: user.contactnumber,
            role: user.role,
            verified: user.verified,
            state: user.state,
            gender: user.gender,
            profileImage: user.profileImage // Include profile image in the response
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// auth.js



  module.exports = router;