const Event = require("../models/event.model");

// CREATE Event
const createEvent = async (req, res) => {
  try {
    const { title, date, description, price } = req.body;
    const newEvent = await Event.create({
      title,
      date,
      description,
      price,
      createdBy: req.user._id,
    });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Server error creating event" });
  }
};

// GET All Events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

// GET Event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event" });
  }
};

// UPDATE Event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Ensure only the creator or an admin can update
    if (event.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this event" });
    }

    const { title, date, description, price } = req.body;

    event.title = title || event.title;
    event.date = date || event.date;
    event.description = description || event.description;
    event.price = price || event.price;

    const updatedEvent = await event.save();
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Error updating event" });
  }
};

// DELETE Event
// const deleteEvent = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);
//     if (!event) return res.status(404).json({ message: "Event not found" });

//     // Ensure only the creator or an admin can delete
//     if (event.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
//       return res.status(403).json({ message: "Not authorized to delete this event" });
//     }

//     await event.remove();
//     res.status(200).json({ message: "Event deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting event" });
//   }
// };

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (
      event.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized to delete this event" });
    }

    await event.deleteOne(); // ✅ This works in Mongoose v6+
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Error deleting event" });
  }
};



    // Check authorization
//     if (
//       event.createdBy.toString() !== req.user._id.toString() &&
//       req.user.role !== "admin"
//     ) {
//       console.log("Unauthorized user");
//       return res
//         .status(403)
//         .json({ message: "Not authorized to delete this event" });
//     }

//     await event.remove();
//     console.log("Event deleted successfully");
//     res.status(200).json({ message: "Event deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting event:", error.message);
//     res.status(500).json({ message: "Error deleting event" });
//   }
// };

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
