const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');

// Endpoint to add a new notification
router.post('/', async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    await newNotification.save();
    res.status(200).json('Notification added successfully');
  } catch (error) {
    console.error('Error adding notification:', error);
    res.status(500).json('Failed to add notification');
  }
});

// Endpoint to fetch all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ date: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json('Failed to fetch notifications');
  }
});



module.exports = router;
