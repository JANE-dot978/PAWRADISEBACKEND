const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/auth.controller');
const { registerSchema } = require('../validation/validation.schema');

// Register Route
router.post('/register', async (req, res, next) => {
  try {
    // Validate input
    await registerSchema.validateAsync(req.body);
    // If validation passes, move to controller
    registerUser(req, res, next);
  } catch (err) {
    next(err); // Forward to error middleware
  }
});

module.exports = router;
