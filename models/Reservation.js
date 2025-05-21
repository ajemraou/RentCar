const mongoose = require('mongoose');
const validator = require('validator');

const ReservationSchema = mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Please add a customer name'],
    trim: true
  },
  customerEmail: {
    type: String,
    required: [true, 'Please add a customer email'],
    trim: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  startDate: {
    type: Date,
    required: [true, 'Please add a start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please add an end date']
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reservation', ReservationSchema);