const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a car name'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Please add a car model'],
    trim: true
  },
  available: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    required: [true, 'Please add a daily rental price']
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/350x150'
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Car', CarSchema);