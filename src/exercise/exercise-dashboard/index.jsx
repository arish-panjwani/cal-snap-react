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
      <Sidebar />
      <div className="main">
        <TopBar />
        <ProgressMetrics />
        <StatisticsChart />
        <Profile />
        <CalendarComponent />
      </div>
    </div>
  );
};

export default ExerciseDashboard;
