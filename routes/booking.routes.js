// const express = require('express');
// const router = express.Router();
// const bookingController = require('../controllers/booking.controller');
// const authMiddleware = require('../middlewares/auth.middleware'); // for protecting routes

// router.post('/', authMiddleware, bookingController.createBooking);
// router.get('/', bookingController.getAllBookings);
// router.delete('/:id', authMiddleware, bookingController.deleteBooking);

// module.exports = router;

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { protect } = require('../middleware/auth.middleware'); // destructure correctly

router.post('/', protect, bookingController.createBooking);
router.get('/', bookingController.getAllBookings);
// router.delete('/:id', authMiddleware, bookingController.deleteBooking);

module.exports = router;
