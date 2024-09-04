import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function AddBooking() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    packages: "",
    date: "",
    status: "Pending", // Default value for status
    securityOfficer: "",
    specialInstructions: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, packages, date } = inputs;

    // Check for required fields
    if (!name || !email || !phone || !packages || !date) {
      alert("Please provide all required information.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/bookings", inputs);
      showAlert("Booking submitted successfully!");
      navigate("/cleientdash"); // Redirect to a different page after submission
    } catch (error) {
      console.error("Error adding booking:", error);
      showAlert("Error submitting booking. Please try again.");
    }
  };

  const showAlert = (message) => {
    alert(message);
  };

  return (
    <div>
      <div className="booking-full-box">
        <div>
          <h1 className="booking-topic">
            Add <span className="booking-us">Booking</span>
          </h1>
          <form onSubmit={handleSubmit} className="booking-full-box-form">
            <label className="booking-full-box-label">Name</label>
            <br />
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              className="booking-full-box-input"
              required
            />
            <br />
            <label className="booking-full-box-label">Email</label>
            <br />
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              className="booking-full-box-input"
              required
            />
            <br />
            <label className="booking-full-box-label">Phone</label>
            <br />
            <input
              type="text"
              name="phone"
              value={inputs.phone}
              onChange={handleChange}
              className="booking-full-box-input"
              required
            />
            <br />
            <label className="booking-full-box-label">Packages</label>
            <br />
            <input
              type="text"
              name="packages"
              value={inputs.packages}
              onChange={handleChange}
              className="booking-full-box-input"
              required
            />
            <br />
            <label className="booking-full-box-label">Date</label>
            <br />
            <input
              type="date"
              name="date"
              value={inputs.date}
              onChange={handleChange}
              className="booking-full-box-input"
              required
            />
            <br />
            <label className="booking-full-box-label">Security Officer</label>
            <br />
            <input
              type="text"
              name="securityOfficer"
              value={inputs.securityOfficer}
              onChange={handleChange}
              className="booking-full-box-input"
            />
            <br />
            <label className="booking-full-box-label">Special Instructions</label>
            <br />
            <textarea
              name="specialInstructions"
              value={inputs.specialInstructions}
              onChange={handleChange}
              className="booking-full-box-input"
            />
            <br />
            <button type="submit" className="booking-add-btn">
              Submit Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBooking;
