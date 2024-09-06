const Operation = require("../Model/Operation");
const Booking = require("../Model/Booking");

const addOperation = async (req, res, next) => {
  try {
    const { bookingId, officers } = req.body;

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Create the new operation using booking details
    const newOperation = new Operation({
      bookingId,
      package: booking.packages,
      status: booking.status,
      securityOfficer: booking.securityOfficer,
      specialInstructions: booking.specialInstructions,
      date: booking.date,
      officers,
    });

    await newOperation.save();
    res.status(201).json({ newOperation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllOperations = async (req, res, next) => {
  try {
    const operations = await Operation.find().populate('bookingId');
    res.status(200).json({ operations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOperationById = async (req, res, next) => {
  try {
    const operation = await Operation.findById(req.params.id).populate('bookingId');
    if (!operation) {
      return res.status(404).json({ message: "Operation not found" });
    }
    res.status(200).json({ operation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateOperation = async (req, res, next) => {
  try {
    const updatedOperation = await Operation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOperation) {
      return res.status(404).json({ message: "Operation not found" });
    }
    res.status(200).json({ updatedOperation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteOperation = async (req, res, next) => {
  try {
    const deletedOperation = await Operation.findByIdAndDelete(req.params.id);
    if (!deletedOperation) {
      return res.status(404).json({ message: "Operation not found" });
    }
    res.status(200).json({ deletedOperation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addOperation,
  getAllOperations,
  getOperationById,
  updateOperation,
  deleteOperation,
};
