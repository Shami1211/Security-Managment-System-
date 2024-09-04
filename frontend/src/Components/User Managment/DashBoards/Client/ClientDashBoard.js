import React from 'react';
import { useNavigate } from 'react-router-dom';

function ClientDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout functionality if needed
    // For example, you might want to clear tokens and navigate to login page
    navigate('/login');
  };

  return (
    <div>
      <h1>Client Dashboard</h1>
      <nav>
        <ul>
          <li>
            <button onClick={() => navigate('/addinquiry')}>Add Inquiry</button>
          </li>
          <li>
            <button onClick={() => navigate('/inquiresdash')}>View Inquiries</button>
          </li>
          <li>
            <button onClick={() => navigate('/settings')}>Settings</button>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default ClientDashboard;
