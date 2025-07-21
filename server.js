
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

const app = express();

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
app.use("/api/users", require("./routes/user.routes"));

// ✅ Event routes
app.use("/api/events", require("./routes/event.routes"));

// ✅ Remove or comment this out if file does not exist
// app.use("/api/auth", require("./routes/auth.routes")); ❌ REMOVE THIS IF auth.routes.js DOESN'T EXIST
// // ✅ User auth routes
//  app.use("/api/users", require("./routes/user.routes"));
app.use('/api/bookings', require('./routes/booking.routes'));

//reports routes
app.use('/api/reports', require('./routes/report.routes'));



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
