// Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // You can add logic here to clear user authentication, if any.
    // For now, we simply redirect to the login page.
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', color: '#ffffff', backgroundColor: '#333333', height: '100vh' }}>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#ffffff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
