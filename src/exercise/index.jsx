import React, { useState } from "react";
import { FaRunning, FaBicycle, FaSwimmer, FaDumbbell, FaYinYang } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './styles.css';

const ExercisePage = () => {
  const [exerciseType, setExerciseType] = useState("");
  const [weight, setWeight] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState(""); // New state for Date
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate inputs
    if (isNaN(weight) || !startTime || !endTime || !date) {
      setError("Please enter valid numbers and times for all fields.");
      return;
    }
    setError("");

    // Log the data for now
    console.log(`Exercise: ${exerciseType}, Weight: ${weight}, Start Time: ${startTime}, End Time: ${endTime}, Date: ${date}`);
    
    // Reset the form
    setExerciseType("");
    setWeight("");
    setStartTime("");
    setEndTime("");
    setDate("");

    // Redirect to the Exercise Dashboard
    navigate("/exercise-dashboard");
  };

  // Example exercise options
  const exercises = [
    { name: "Running", icon: <FaRunning /> },
    { name: "Walking", icon: <FaYinYang /> },
    { name: "Cycling", icon: <FaBicycle /> },
    { name: "Swimming", icon: <FaSwimmer /> },
    { name: "Yoga", icon: <FaYinYang /> },
    { name: "Weight Lifting", icon: <FaDumbbell /> },
    { name: "HIIT", icon: <FaRunning /> },
    { name: "Dancing", icon: <FaYinYang /> },
    { name: "Pilates", icon: <FaYinYang /> },
    { name: "Jump Rope", icon: <FaRunning /> }
  ];

  return (
    <div className="exercise-container">
      <h1>Exercise Tracker</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="exercise-form">
        <div className="form-group">
          <label>Type of Exercise</label>
          <select
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value)}
            className="input-field"
            required
          >
            <option value="">Select an exercise</option>
            {exercises.map((exercise, index) => (
              <option key={index} value={exercise.name}>
                {exercise.icon} {exercise.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Weight (in kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g., 70"
            className="input-field"
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Date</label> {/* New Date field */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label>Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label>End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          <FaDumbbell /> Log Exercise
        </button>
      </form>
    </div>
  );
};

export default ExercisePage;
