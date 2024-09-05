const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Booking',  // References the Booking model
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    enum: ['Credit Card', 'Debit Card', 'PayPal', 'Cash'],  // Different payment methods
    required: true,
  },
  status: {
    type: String,
    enum: ['Paid', 'Pending', 'Failed'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Payment', PaymentSchema);
