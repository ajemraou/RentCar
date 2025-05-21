const asyncHandler = require("express-async-handler");
const Reservation = require("../models/Reservation");
const Car = require("../models/Car");
const { isDateRangeOverlapping } = require("../utils/dateUtils");
const { sendReservationNotification } = require("../services/emailService");

// @desc    Create a new reservation
// @route   POST /api/reservations
// @access  Public
const createReservation = asyncHandler(async (req, res) => {
  const { customerName, customerEmail, carId, startDate, endDate } = req.body;

  // Validation
  if (!customerName || !customerEmail || !carId || !startDate || !endDate) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    res.status(400);
    throw new Error("Invalid date format. Use YYYY-MM-DD");
  }

  if (start >= end) {
    res.status(400);
    throw new Error("End date must be after start date");
  }

  // Check if car exists
  const car = await Car.findById(carId);
  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }

  // Check if car is available
  if (!car.available) {
    res.status(400);
    throw new Error("This car is not available for rent");
  }

  // Check for overlapping reservations
  const existingReservations = await Reservation.find({
    carId,
    status: { $in: ["pending", "confirmed"] },
  });

  const isOverlapping = existingReservations.some((reservation) =>
    isDateRangeOverlapping(
      start,
      end,
      new Date(reservation.startDate),
      new Date(reservation.endDate),
    ),
  );

  if (isOverlapping) {
    res.status(400);
    throw new Error("Car is already reserved for the selected dates");
  }

  // Calculate total price (days * daily rate)
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  const totalPrice = days * car.price;

  // Create reservation
  const reservation = await Reservation.create({
    customerName,
    customerEmail,
    carId,
    startDate: start,
    endDate: end,
    totalPrice,
  });

  // Send email notification to admin
  await sendReservationNotification(reservation, car);

  res.status(201).json(reservation);
});

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Private/Admin
const getReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({}).populate(
    "carId",
    "name model",
  );

  res.status(200).json(reservations);
});

// @desc    Get reservation by ID
// @route   GET /api/reservations/:id
// @access  Private/Admin
const getReservationById = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id).populate(
    "carId",
    "name model imageUrl",
  );

  if (!reservation) {
    res.status(404);
    throw new Error("Reservation not found");
  }

  res.status(200).json(reservation);
});

// @desc    Update reservation status
// @route   PUT /api/reservations/:id
// @access  Private/Admin
const updateReservationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (
    !status ||
    !["pending", "confirmed", "completed", "cancelled"].includes(status)
  ) {
    res.status(400);
    throw new Error("Please provide a valid status");
  }

  const reservation = await Reservation.findById(req.params.id);

  if (!reservation) {
    res.status(404);
    throw new Error("Reservation not found");
  }

  reservation.status = status;
  await reservation.save();

  res.status(200).json(reservation);
});

module.exports = {
  createReservation,
  getReservations,
  getReservationById,
  updateReservationStatus,
};
