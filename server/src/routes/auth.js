 const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/register', async (req, res) => {
    try {44
        const { name, email, contactnumber, password, role, state, institutecode, verified } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        user = new User({
            name,
            email,
            contactnumber,
            password,
            role,
            state,
            institutecode,
            verified,
        });

        await user.save();
        res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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
            return res.status(400).json({ msg: user.rejected ? 
                                         "Admin rejected your form, please register again with correct information." :
                                         "Your account is pending admin approval. Please wait for verification." });
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
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
