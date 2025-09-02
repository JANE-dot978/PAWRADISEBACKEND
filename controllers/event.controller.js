// const Event = require("../models/event.model");

// // CREATE Event
// const createEvent = async (req, res) => {
//   try {
//     const { title, date, description, location, price } = req.body;

//     if (!title || !date) {
//       return res.status(400).json({ message: "Title and date are required" });
//     }

//     const newEvent = await Event.create({
//       title,
//       date,
//       description,
//       location,
//       price,
//       createdBy: req.user._id,
//     });

//     res.status(201).json(newEvent);
//   } catch (error) {
//     console.error("Error creating event:", error);
//     res.status(500).json({ message: "Server error creating event" });
//   }
// };

// // GET All Events
// const getAllEvents = async (req, res) => {
//   try {
//     const events = await Event.find().sort({ date: 1 });
//     res.status(200).json(events);
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     res.status(500).json({ message: "Error fetching events" });
//   }
// };

// // GET Event by ID
// const getEventById = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);
//     if (!event) return res.status(404).json({ message: "Event not found" });
//     res.status(200).json(event);
//   } catch (error) {
//     console.error("Error fetching event:", error);
//     res.status(500).json({ message: "Error fetching event" });
//   }
// };

// // UPDATE Event
// const updateEvent = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);
//     if (!event) return res.status(404).json({ message: "Event not found" });

//     // Authorization: only creator or admin
//     if (
//       event.createdBy.toString() !== req.user._id.toString() &&
//       req.user.role !== "admin"
//     ) {
//       return res.status(403).json({ message: "Not authorized to update this event" });
//     }

//     const { title, date, description, location, price } = req.body;

//     event.title = title || event.title;
//     event.date = date || event.date;
//     event.description = description || event.description;
//     event.location = location || event.location;
//     event.price = price || event.price;

//     const updatedEvent = await event.save();
//     res.status(200).json(updatedEvent);
//   } catch (error) {
//     console.error("Error updating event:", error);
//     res.status(500).json({ message: "Error updating event" });
//   }
// };

// // DELETE Event
// const deleteEvent = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);
//     if (!event) return res.status(404).json({ message: "Event not found" });

//     // Only creator or admin can delete
//     if (
//       event.createdBy.toString() !== req.user._id.toString() &&
//       req.user.role !== "admin"
//     ) {
//       return res.status(403).json({ message: "Not authorized to delete this event" });
//     }

//     await event.deleteOne();
//     res.status(200).json({ message: "Event deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting event:", error);
//     res.status(500).json({ message: "Error deleting event" });
//   }
// };

// module.exports = {
//   createEvent,
//   getAllEvents,
//   getEventById,
//   updateEvent,
//   deleteEvent,
// };


const Event = require("../models/event.model");

exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

