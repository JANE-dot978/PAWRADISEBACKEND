const Event = require("../models/event.model");
const createEvent = async (req, res) =>{
    try{
        const{title, date, description, price}= req.body;
        const newEvent= await Event.create({
            title,
            date,
            description,
            price,
            createdBy: req.user._id,

        });
        res.status(201).json(newEvent);
    } catch(error) {
        res.status(500).json({message:"server error creating event"});
    }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
};

