// ExerciseDashboard.jsx
import React from 'react';
import Sidebar from './sidebar';
import TopBar from './topBar';
import ProgressMetrics from './progressMetrics';
import StatisticsChart from './statisticsChart';
import Profile from './profile';
import CalendarComponent from './calendar';

const ExerciseDashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar className="sidebar" />
      <div className="main">
        <TopBar className="top-bar" />
        <ProgressMetrics className="progress-metrics" />
        <StatisticsChart className="statistics-chart" />
        <Profile className="profile" />
        <CalendarComponent className="calendar" />
      </div>
    </div>
  );
};

export default ExerciseDashboard;