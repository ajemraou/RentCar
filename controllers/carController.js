const asyncHandler = require("express-async-handler");
const Car = require("../models/Car");
const Reservation = require("../models/Reservation");
const { isDateRangeOverlapping } = require("../utils/dateUtils");

// @desc    Create a new car
// @route   POST /api/cars
// @access  Private/Admin
const createCar = asyncHandler(async (req, res) => {
  const { name, model, price, imageUrl, description } = req.body;

  // Validation
  if (!name || !model || !price || !description) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Create car
  const car = await Car.create({
    name,
    model,
    price,
    imageUrl: imageUrl || undefined,
    description,
  });

  res.status(201).json(car);
});

// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
const getCars = asyncHandler(async (req, res) => {
  const cars = await Car.find({});
  res.status(200).json(cars);
});

// @desc    Get car by ID
// @route   GET /api/cars/:id
// @access  Public
const getCarById = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }

  res.status(200).json(car);
});

// @desc    Update car
// @route   PUT /api/cars/:id
// @access  Private/Admin
const updateCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }

  const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedCar);
});

// @desc    Delete car
// @route   DELETE /api/cars/:id
// @access  Private/Admin
const deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }

  // Check if car has active reservations
  const activeReservations = await Reservation.find({
    carId: req.params.id,
    status: { $in: ["pending", "confirmed"] },
  });

  if (activeReservations.length > 0) {
    res.status(400);
    throw new Error("Cannot delete car with active reservations");
  }

  await car.deleteOne();

  res.status(200).json({ id: req.params.id });
});

// @desc    Get available cars by date range
// @route   GET /api/available-cars
// @access  Public
const getAvailableCars = asyncHandler(async (req, res) => {
  const { start, end } = req.query;

  // Validation
  if (!start || !end) {
    res.status(400);
    throw new Error("Please provide start and end dates");
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    res.status(400);
    throw new Error("Invalid date format. Use YYYY-MM-DD");
  }

  if (startDate >= endDate) {
    res.status(400);
    throw new Error("End date must be after start date");
  }

  // Get all cars
  const allCars = await Car.find({ available: true });

  // Get all reservations that overlap with the requested date range
  const reservations = await Reservation.find({
    $and: [
      { status: { $in: ["pending", "confirmed"] } },
      {
        $or: [
          // Reservation starts during requested period
          { startDate: { $gte: startDate, $lte: endDate } },
          // Reservation ends during requested period
          { endDate: { $gte: startDate, $lte: endDate } },
          // Reservation encompasses requested period
          {
            $and: [
              { startDate: { $lte: startDate } },
              { endDate: { $gte: endDate } },
            ],
          },
        ],
      },
    ],
  });

  // Filter out cars that have reservations in the specified date range
  const reservedCarIds = reservations.map((reservation) =>
    reservation.carId.toString(),
  );
  const availableCars = allCars.filter(
    (car) => !reservedCarIds.includes(car._id.toString()),
  );

  res.status(200).json(availableCars);
});

module.exports = {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  getAvailableCars,
};
