
// const express = require("express");
// const dotenv = require("dotenv");
// dotenv.config();
// const cors = require("cors");
// const connectDB = require("./helpers/initMongo");

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Test route
// app.get("/", (req, res) => {
//   res.send("🐾 Welcome to Pawradise API");
// });

// // ✅ User auth routes
// app.use("/api/users", require("./routes/user.routes"));

// // ✅ Event routes
// app.use("/api/events", require("./routes/event.routes"));

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// server.js
// 
// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const eventRoutes = require("./routes/event.routes"); // Uncomment when ready
// const bookingRoutes = require("./routes/booking.routes"); // Uncomment when ready

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);   // future event routes
// app.use("/api/bookings", bookingRoutes); // future booking routes

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Pawradise Backend API 🚀" });
});

// Database connection & server start
const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // Exit process if DB connection fails
  });
