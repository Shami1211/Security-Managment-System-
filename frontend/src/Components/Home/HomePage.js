import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Home/CSS/Homepage.css'; // Optional: Add custom CSS styling

function HomePage() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Management Dashboard</h1>

      <div className="button-group">
        <button onClick={() => handleNavigation('/user/adduser')} className="nav-button">
          Register As Employee or Client
        </button>
       
      </div>

      <div className="card-container">
        <div className="card" onClick={() => handleNavigation('/user/login')}>
          <h3>User Management</h3>
        </div>
        <div className="card" onClick={() => handleNavigation('/trainng/login')}>
          <h3>Training Management</h3>
        </div>
        <div className="card" onClick={() => handleNavigation('/clientlogin')}>
          <h3>Client Management</h3>
        </div>
        <div className="card" onClick={() => handleNavigation('/bookingmanagerlogin')}>
          <h3>Booking Management</h3>
        </div>
        <div className="card" onClick={() => handleNavigation('/paymentMnlogin')}>
          <h3>Payment Management</h3>
        </div>
        <div className="card" onClick={() => handleNavigation('/operatonlogin')}>
          <h3>Operation Management</h3>
        </div>
        <div className="card" onClick={() => handleNavigation('/inlogin')}>
          <h3>Inventory Management</h3>
        </div>
        <div className="card" onClick={() => handleNavigation('/leave-management')}>
          <h3>Leave Management</h3>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
