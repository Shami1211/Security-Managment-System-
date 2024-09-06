import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const AddOperation = () => {
  const location = useLocation();
  const { booking } = location.state || {};

  // State to manage the list of officers
  const [officers, setOfficers] = useState(booking?.officers || []);
  const [newOfficer, setNewOfficer] = useState("");

  // Function to handle adding a new officer
  const handleAddOfficer = () => {
    if (newOfficer) {
      setOfficers([...officers, newOfficer]);
      setNewOfficer("");
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would typically handle form submission to your backend
    console.log("Form submitted with the following data:");
    console.log({
      name: booking?.name,
      email: booking?.email,
      phone: booking?.phone,
      packages: booking?.packages,
      date: booking?.date,
      status: booking?.status,
      securityOfficer: booking?.securityOfficer,
      specialInstructions: booking?.specialInstructions,
      officers
    });
  };

  return (
    <div className="add-operation">
      <h1>Create Operation Schedule</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={booking?.name || ''} readOnly />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={booking?.email || ''} readOnly />
        </label>
        <br />
        <label>
          Phone:
          <input type="text" value={booking?.phone || ''} readOnly />
        </label>
        <br />
        <label>
          Packages:
          <input type="text" value={booking?.packages || ''} readOnly />
        </label>
        <br />
        <label>
          Date:
          <input type="date" value={booking?.date || ''} readOnly />
        </label>
        <br />
        <label>
          Status:
          <input type="text" value={booking?.status || ''} readOnly />
        </label>
        <br />
        <label>
          Security Officer:
          <input type="text" value={booking?.securityOfficer || ''} readOnly />
        </label>
        <br />
        <label>
          Special Instructions:
          <input type="text" value={booking?.specialInstructions || ''} readOnly />
        </label>
        <br />
        <label>
          Officers:
          <div>
            <input
              type="text"
              value={newOfficer}
              onChange={(e) => setNewOfficer(e.target.value)}
              placeholder="Enter officer name"
            />
            <button type="button" onClick={handleAddOfficer}>
              Add Officer
            </button>
          </div>
          <ul>
            {officers.map((officer, index) => (
              <li key={index}>{officer}</li>
            ))}
          </ul>
        </label>
        <br />
        <button type="submit">Save Schedule</button>
      </form>
    </div>
  );
};

export default AddOperation;
