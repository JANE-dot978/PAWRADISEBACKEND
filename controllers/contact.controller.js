const ContactMessage = require("../models/contact.model");

// POST /api/contact  (public)
const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "name, email and message are required" });
    }

    const saved = await ContactMessage.create({ name, email, phone, message });
    res.status(201).json({
      success: true,
      message: "Message received",
      data: saved,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/contact  (protected: admin + employee)
const getAllContacts = async (_req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages" });
  }
};

// PATCH /api/contact/:id/read  (protected: admin + employee)
const markAsRead = async (req, res) => {
  try {
    const updated = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status: "read" },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Message not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating message" });
  }
};

module.exports = { createContact, getAllContacts, markAsRead };
