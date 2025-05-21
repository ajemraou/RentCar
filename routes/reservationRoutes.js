const express = require("express");
const router = express.Router();
const {
  createReservation,
  getReservations,
  getReservationById,
  updateReservationStatus,
} = require("../controllers/reservationController");
const adminAuth = require("../middleware/adminAuth");

// Public routes
router.post("/", createReservation);

// Admin routes
router.get("/", adminAuth, getReservations);
router.get("/:id", adminAuth, getReservationById);
router.put("/:id", adminAuth, updateReservationStatus);

module.exports = router;
