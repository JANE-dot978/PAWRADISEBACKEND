const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./helpers/initMongo"); // If you're using helpers/initMongo.js




const app = express();

// Connect to MongoDB
connectDB(); 

// Middleware
app.use(cors());
app.use(express.json());

// Default route to test server
app.get("/", (req, res) => {
  res.send("🐾 Welcome to Pawradise API");
});

// Load routes here later
// app.use("/api/users", require("./routes/user.routes"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

