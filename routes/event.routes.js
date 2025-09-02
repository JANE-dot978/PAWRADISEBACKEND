// const express = require("express");
// const router = express.Router();
// const {
//   createEvent,
//   getAllEvents,
//   getEventById,
//   updateEvent,
//   deleteEvent,
// } = require("../controllers/event.controller");

// const { protect } = require("../middleware/auth.middleware");
// const { authorize } = require("../middleware/role.middleware");

// // Public route: anyone can view all events
// router.get("/", getAllEvents);

// // Public or protected depending on your needs
// router.get("/:id", getEventById);

// // Protected: only logged-in users can create
// router.post("/", protect, createEvent);

// // Protected + role-based: only Admin or Employee can update/delete
// router.put("/:id", protect, authorize("admin", "employee"), updateEvent);
// router.delete("/:id", protect, authorize("admin"), deleteEvent);

// module.exports = router;
// const express = require("express");
// const router = express.Router();
// const {
//   createEvent,
//   getAllEvents,
//   getEventById,
//   updateEvent,
//   deleteEvent,
// } = require("../controllers/event.controller");

// const { protect, authorize } = require("../middleware/auth.middleware");

// // -------------------
// // Public Routes
// // -------------------

// // Anyone can view events
// router.get("/", getAllEvents);
// router.get("/:id", getEventById);

// // -------------------
// // Protected Routes
// // -------------------

// // Only logged in users with "employee" or "admin" role can create events
// router.post("/", protect, authorize("employee", "admin"), createEvent);

// // Only the event creator (or admin) should be able to update
// router.put(
//   "/:id",
//   protect,
//   authorize("employee", "admin"), // adjust if you want only admins
//   updateEvent
// );

// // Only admins can delete events
// router.delete("/:id", protect, authorize("admin"), deleteEvent);

// module.exports = router;
const express = require("express");
const router = express.Router();

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");

// const protect = require("../middleware/auth.middleware");
// event.routes.js
const { protect } = require("../middleware/auth.middleware");

const authorize = require("../middleware/role.middleware");

// Public
router.get("/", getAllEvents);
router.get("/:id", getEventById);

// Protected
router.post("/", protect, authorize("employee", "admin"), createEvent);
router.put("/:id", protect, authorize("employee", "admin"), updateEvent);
router.delete("/:id", protect, authorize("admin"), deleteEvent);

module.exports = router;
