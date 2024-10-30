// ExerciseDashboard.jsx
import React from 'react';
import Sidebar from './sidebar';
import TopBar from './topBar';
import ProgressMetrics from './progressMetrics';
import StatisticsChart from './statisticsChart';
import Profile from './profile';
import CalendarComponent from './calendar';
import './styles.css';  // Make sure to include the updated CSS file


const ExerciseDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar className="sidebar" />

      {/* Main Content */}
      <div className="main">
        {/* Top Bar */}
        <TopBar className="top-bar" />

        {/* Progress Metrics */}
        <ProgressMetrics className="progress-metrics" />

        {/* Statistics Section */}
        <StatisticsChart className="statistics-chart" />

        {/* Profile */}
        <Profile className="profile" />

        {/* Calendar Component */}
        <CalendarComponent className="calendar" />

      </div>
    </div>
  );
};

export default ExerciseDashboard;
