// routes/contact.routes.js
const express = require('express');
const router = express.Router();

// POST /api/contact
router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // For now, just send back what we got (mock response)
  res.status(200).json({
    success: true,
    message: 'Contact form received',
    data: { name, email, message }
  });
});

module.exports = router;
