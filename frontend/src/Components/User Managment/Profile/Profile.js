import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Profile() {
  const { id } = useParams(); // Get the employee ID from the route params
  const [employee, setEmployee] = useState(null); // State to hold the employee data
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/employee/${id}`);
        setEmployee(response.data.emp); // Set the employee data
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleDashboardNavigation = () => {
    if (employee) {
      if (employee.type === 'Client') {
        navigate('/clientdash');
      } else if (employee.type === 'Employee') {
        navigate('/employeedash');
      } else {
        console.error('Unknown user type:', employee.type);
      }
    }
  };

  if (!employee) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  return (
    <div className="profile-container">
      <h1>Employee Profile</h1>
      <div className="profile-details">
        <p><strong>Type:</strong> {employee.type}</p>
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.gmail}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Address:</strong> {employee.address}</p>
      </div>
      <button onClick={handleDashboardNavigation}>Go to Dashboard</button>
    </div>
  );
}

export default Profile;
