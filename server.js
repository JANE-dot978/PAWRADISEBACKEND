
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

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./helpers/initMongo");
const errorHandler = require('./middleware/error.middleware');

// Import Routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");



const app = express();
app.use(express.json());

app.use(errorHandler);


// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("🐾 Welcome to Pawradise API");
});

// ✅ User auth routes (already includes login/register)
// app.use("/api/users", require("./routes/user.routes"));

// ✅ Event routes
app.use("/api/events", require("./routes/event.routes"));

// ✅ Remove or comment this out if file does not exist
//  app.use("/api/auth", require("./routes/auth.routes"));
// // ✅ User auth routes
//  app.use("/api/users", require("./routes/user.routes"));
app.use('/api/bookings', require('./routes/booking.routes'));

//reports routes
app.use('/api/reports', require('./routes/report.routes'));

// // Routes
// app.use('/api/contact', require('./routes/contact.routes'));
app.use("/api/contact", require("./routes/contact.routes"));

// Use Routes
app.use("/api/auth", authRoutes);   // e.g. /api/auth/register, /api/auth/login
app.use("/api/users", userRoutes); // e.g. /api/users, /api/users/:id


// Error handler (MUST be at the bottom)
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.message); // log to backend console
  res.status(500).json({ error: err.message });
});




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});