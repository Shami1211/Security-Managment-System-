const Payment = require('../Model/Payment');
const Booking = require('../Model/Booking');

const addPayment = async (req, res, next) => {
  try {
    const { bookingId, amount, method, status } = req.body;

    // Check if the booking exists
    const existingBooking = await Booking.findById(bookingId);
    if (!existingBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const newPayment = new Payment({
      bookingId,
      amount,
      method,
      status: 'Paid',
    });

    await newPayment.save();
    res.status(201).json({ newPayment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find().populate('bookingId', 'name email date');
    res.status(200).json({ payments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getPaymentById = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('bookingId', 'name email');
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updatePayment = async (req, res, next) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ updatedPayment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deletePayment = async (req, res, next) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
    if (!deletedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ deletedPayment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};






module.exports = {
  addPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  
};
