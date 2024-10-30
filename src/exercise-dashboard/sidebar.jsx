import React from 'react';
import { FaHome, FaChartBar, FaCalendarAlt } from 'react-icons/fa'; // Example icons

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><FaHome /> Home</li>
        <li><FaChartBar /> Progress</li>
        <li><FaCalendarAlt /> Calendar</li>
        {/* Add other icons as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;