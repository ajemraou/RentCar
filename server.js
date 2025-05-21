const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const carRoutes = require("./routes/carRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const authRoutes = require("./routes/authRoutes");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Routes
app.use("/api/cars", carRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/auth", authRoutes);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
