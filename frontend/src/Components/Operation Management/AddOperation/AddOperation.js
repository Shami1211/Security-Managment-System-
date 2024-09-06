import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation ,useNavigate} from "react-router-dom";

const AddOperation = () => {
  const location = useLocation();
  const { booking } = location.state || {};

  // State to manage the list of officers
  const [officers, setOfficers] = useState(booking?.officers || []);
  const [newOfficer, setNewOfficer] = useState("");
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [selectedOfficer, setSelectedOfficer] = useState("");
  const navigate = useNavigate();


  // Fetch employees from the backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/employee'); // Update the endpoint if needed
        const employees = response.data.emp.filter(employee => employee.type === 'Employee');
        setEmployeeOptions(employees);
 
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Function to handle adding a new officer
  const handleAddOfficer = () => {
    if (selectedOfficer && !officers.includes(selectedOfficer)) {
      setOfficers([...officers, selectedOfficer]);
      setSelectedOfficer("");
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend with the booking ID and officers
      const response = await axios.post('http://localhost:5000/operations', {
        bookingId: booking._id, // Ensure booking._id is available and correct
        officers
      });

      // Handle the response
      console.log("Operation added:", response.data);
      alert("Added Succefully!");

      // Navigate to /allbookings
      navigate('/allbookings');
    } catch (error) {
      console.error("Error adding operation:", error);
      // Optionally, you could display an error message
    }
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
            <select
              value={selectedOfficer}
              onChange={(e) => setSelectedOfficer(e.target.value)}
            >
              <option value="">Select an officer</option>
              {employeeOptions.map((employee) => (
                <option key={employee._id} value={employee.name}>
                  {employee.name}
                </option>
              ))}
            </select>
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
