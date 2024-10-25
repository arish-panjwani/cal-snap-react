import React from 'react';
import { Bar } from 'react-chartjs-2'; // Importing Bar from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registering necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatisticsChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Exercise Data',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Exercise Statistics',
      },
    },
  };

  return (
    <div>
      <h2>Exercise Statistics</h2>
      <Bar data={data} options={options} /> {/* Using Bar component */}
    </div>
  );
};

export default StatisticsChart;