
// routes/contact.routes.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.model');

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newContact = await Contact.create({ name, email, message });
    res.status(201).json({
      success: true,
      data: newContact
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
