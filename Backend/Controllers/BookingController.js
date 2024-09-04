const Booking = require("../Model/Booking");

const validateBooking = async (req, res, next) => {
  try {
    const existingBooking = await Booking.findOne({ email: req.body.email, name: req.body.name });
    if (existingBooking) {
      return res.status(200).json({ 
        message: "Booking with the same name and email found", 
        existingBooking 
      });
    } else {
      return res.status(404).json({ message: "No matching booking found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addBooking = async (req, res, next) => {
  try {
    const existingBooking = await Booking.findOne({ email: req.body.email });
    if (existingBooking) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ updatedBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ deletedBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  validateBooking,
};
