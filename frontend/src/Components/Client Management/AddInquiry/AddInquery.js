import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function AddInquiry() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    message: "",
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
    if (!inputs.name || !inputs.email || !inputs.message) {
      alert("Please provide all required information.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/inquiries", inputs);
      showAlert("Inquiry submitted successfully!");
      navigate("/cleientdash"); // Redirect to a different page after submission
    } catch (error) {
      console.error("Error adding inquiry:", error);
      showAlert("Error submitting inquiry. Please try again.");
    }
  };

  const showAlert = (message) => {
    alert(message);
  };

  const handleViewInquiries = () => {
    navigate("/inquiries");
  };

  return (
    <div>
      <div className="inquiry-full-box">
        <div>
          <h1 className="inquiry-topic">
            Add <span className="inquiry-us">Inquiry</span>
          </h1>
          <form onSubmit={handleSubmit} className="inquiry-full-box-form">
            <label className="inquiry-full-box-label">Name</label>
            <br />
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              className="inquiry-full-box-input"
              required
            />
            <br />
            <label className="inquiry-full-box-label">Email</label>
            <br />
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              className="inquiry-full-box-input"
              required
            />
            <br />
            <label className="inquiry-full-box-label">Message</label>
            <br />
            <textarea
              name="message"
              value={inputs.message}
              onChange={handleChange}
              className="inquiry-full-box-input"
              required
            />
            <br />
            <button type="submit" className="inquiry-add-btn">
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddInquiry;
