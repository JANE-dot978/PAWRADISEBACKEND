const express = require("express");
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");
const { protect } = require("../middleware/auth.middleware");

// Public route to get all events
router.get("/", getAllEvents);

// Protected routes
router.post("/", protect, createEvent);
router.get("/:id", getEventById); // optional: protect if needed
router.put("/:id",  updateEvent);
router.delete("/:id", protect, deleteEvent);

module.exports = router;

