const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Fetch all pending verification requests
router.get('/verification/requests', async (req, res) => {
    try {
        const { state } = req.query;
        const verificationRequests = await User.find({ role: 1, verified: false, state: state });
        res.status(200).json(verificationRequests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Approve an institute
router.put('/approve/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const institute = await User.findById(id);
        if (!institute) return res.status(404).json({ msg: "Institute not found" });

        institute.verified = true;
        institute.rejected = false;
        await institute.save();

        res.status(200).json({ msg: "Institute approved successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Reject an institute
router.put('/reject/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const institute = await User.findById(id);
        if (!institute) return res.status(404).json({ msg: "Institute not found" });

        institute.verified = false;
        institute.rejected = true;
        await institute.save();

        res.status(200).json({ msg: "Institute rejected successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch all approved/rejected institutes for a specific state
router.get('/institutes', async (req, res) => {
    try {
        const { state } = req.query;
        const institutes = await User.find({ role: 1, state: state, $or: [{ verified: true }, { rejected: true }] });
        res.status(200).json(institutes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});







module.exports = router;