import React from 'react';

const ProgressMetrics = () => {
  const metrics = [
    { label: 'Heart Rate', value: '82-90 BPM', icon: '❤️' },
    { label: 'Running', value: '1000 Steps', icon: '🏃' },
    { label: 'Calories', value: '450 Kcal', icon: '🔥' },
    { label: 'Sleep', value: '1000 Score', icon: '🛌' }
  ];

  return (
    <div className="metrics">
      {metrics.map((metric, index) => (
        <div key={index} className="metric-card">
          <span>{metric.icon}</span>
          <h3>{metric.label}</h3>
          <p>{metric.value}</p>
        </div>
      ))}
    </div>
  );
};

export default ProgressMetrics;