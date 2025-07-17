const express = require("express");
const router = express.Router();
const { createEvent, getAllEvents } = require("../controllers/event.controller");
const { protect } = require("../middleware/auth.middleware"); // assumes middleware is set

// GET all events (public)
router.get("/", getAllEvents);

// POST create event (protected - only logged in users can create)
router.post("/", protect, createEvent);

module.exports = router;

