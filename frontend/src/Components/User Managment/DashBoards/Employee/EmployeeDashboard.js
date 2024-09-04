import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout functionality if needed
    // For example, you might want to clear tokens and navigate to login page
    navigate('/login');
  };

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <nav>
        <ul>
          <li>
            <button onClick={() => navigate('/profile')}>View Profile</button>
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

export default EmployeeDashboard;
