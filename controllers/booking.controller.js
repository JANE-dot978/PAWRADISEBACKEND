const Booking = require('../models/booking.model');
const Event = require('../models/event.model');

// @desc Create a booking
// @route POST /api/bookings
// @access Protected (User)
const createBooking = async (req, res) => {
  try {
    const { eventId } = req.body;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Create a new booking
    const booking = new Booking({
      event: eventId,
      user: req.user._id, // comes from protect middleware
      bookedAt: new Date(), // correct field
      paymentStatus: 'pending' // correct field
    });

    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error while booking', error: error.message });
  }
};

// @desc Get current user's bookings
// @route GET /api/bookings/my
// @access Protected (User)
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('event');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching your bookings' });
  }
};

// @desc Get all bookings (admin/employee)
// @route GET /api/bookings
// @access Protected (Admin/Employee)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('event').populate('user');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all bookings' });
  }
};

// @desc Cancel a booking
// @route PUT /api/bookings/:id/cancel
// @access Protected (User)
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if the booking belongs to the logged-in user
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    booking.paymentStatus = 'cancelled'; // fixed field
    await booking.save();
    res.status(200).json({ message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking' });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking
};
