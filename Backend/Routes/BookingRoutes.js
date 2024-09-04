const express = require("express");
const booking_router = express.Router();
const BookingController = require("../Controllers/BookingController");

booking_router.post("/", BookingController.addBooking);
booking_router.get("/", BookingController.getAllBookings);
booking_router.get("/:id", BookingController.getBookingById);
booking_router.put("/:id", BookingController.updateBooking);
booking_router.delete("/:id", BookingController.deleteBooking);
booking_router.post("/validate", BookingController.validateBooking);

module.exports = booking_router;
