const express = require("express");
const router = express.Router();
const {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  getAvailableCars,
} = require("../controllers/carController");
const adminAuth = require("../middleware/adminAuth");

// Public routes
router.get("/", getCars);
router.get("/available", getAvailableCars);
router.get("/:id", getCarById);

// Admin routes
router.post("/", adminAuth, createCar);
router.put("/:id", adminAuth, updateCar);
router.delete("/:id", adminAuth, deleteCar);

module.exports = router;
