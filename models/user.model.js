const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // no duplicate accounts
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "employee", "user"],
    default: "user",
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

