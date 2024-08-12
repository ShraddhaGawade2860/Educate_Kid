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

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        // Create new user
        user = new User({
            name,
            email,
            contactnumber,
            password, // Save plain text password
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
// Login route
router.post('/login', async (req, res) => {
    try {
        const { identifier, password } = req.body;
        console.log('Received login request with:', { identifier, password });

        let user;

        // Identify the user based on email or state for admin
        if (identifier.includes('@')) {
            user = await User.findOne({ email: identifier });
        } else {
            user = await User.findOne({ state: identifier, role: 2 });
        }

        // If no user is found
        if (!user) {
            console.log('User does not exist');
            return res.status(400).json({ msg: "User does not exist" });
        }

        console.log(`Plain password: ${password}`);
        console.log(`Stored password from DB: ${user.password}`);

        // Compare plain text password
        if (password !== user.password) {
            console.log('Password mismatch');
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Check if the institute's account is verified
        if (user.role === 1 && !user.verified) {
            return res.status(400).json({
                msg: user.rejected ?
                    "Admin rejected your form, please register again with correct information." :
                    "Your account is pending admin approval. Please wait for verification."
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Login successful for user:', user);

        // Send back user data and token
        res.status(200).json({
            token,
            id: user._id,
            name: user.name,
            email: user.email,
            contactnumber: user.contactnumber,
            role: user.role,
            institutecode: user.institutecode,
            verified: user.verified,
            state: user.state,
            gender: user.gender,
            profileImage: user.profileImage 
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: error.message });
    }
});


/*const saltRounds = 10;

// Plain password and stored hash for comparison
const plainPassword = 'yash123';
const storedHash = '$2b$10$rk75Ju7tVmcaJZIDJHXgv.UA2fXr7pPxtZIJLdeL6YomJw9txnH7O';

// Hash the plain password
bcrypt.hash(plainPassword, saltRounds, (err, newHash) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Newly hashed password:', newHash);

    // Compare the new hash with the stored hash
    bcrypt.compare(plainPassword, storedHash, (err, result) => {
      if (err) {
        console.error('Error comparing passwords:', err);
      } else {
        console.log('Password match:', result); // Should be true if everything matches
      }
    });
  }
});*/

router.put('/users/:id', async (req, res) => {
    console.log('Received PUT request for user ID:', req.params.id); // Debug statement
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
  });

module.exports = router;
