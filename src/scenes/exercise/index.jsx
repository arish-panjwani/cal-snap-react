import React, { useState } from "react";
import { FaRunning, FaBicycle, FaSwimmer, FaDumbbell, FaYinYang } from "react-icons/fa"; // Importing specific icons
import './styles.css';  // Import your CSS file

const ExercisePage = () => {
  const [exerciseType, setExerciseType] = useState("");
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate inputs
    if (isNaN(duration) || isNaN(calories) || isNaN(weight)) {
      setError("Please enter valid numbers for Duration, Calories, and Weight.");
      return;
    }
    setError("");

    // Log the data for now
    console.log(`Exercise: ${exerciseType}, Weight: ${weight}, Duration: ${duration}, Calories: ${calories}`);
    // Reset the form
    setExerciseType("");
    setWeight("");
    setDuration("");
    setCalories("");
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
      {error && <p className="error">{error}</p>} {/* Display error message */}
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
            min="0" // Ensure no negative weight
          />
        </div>

        <div className="form-group">
          <label>Duration (in minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g., 30"
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label>Calories Burnt</label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="e.g., 300"
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
