import React from 'react';

const TopBar = () => {
  return (
    <div className="topbar">
      <h1>Hello Sam, Let's Shape Yourself</h1>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button>🔔</button> {/* Notification Bell */}
      </div>
    </div>
  );
};

export default TopBar;