const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String },
    message: { type: String, required: true, maxlength: 2000 },
    status: { type: String, enum: ["new", "read", "archived"], default: "new" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactMessage", contactSchema);
