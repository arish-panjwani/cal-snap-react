import React, { useState } from "react";
import { FaRunning, FaBicycle, FaSwimmer, FaDumbbell, FaYinYang } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Box, Typography, IconButton, Avatar } from "@mui/material"; // MUI Components
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"; // Corrected import
import { tokens } from '../theme/theme';  // Adjust the path as needed
import avatar from '../assets/img/avatar.png'; // Adjust the path as needed
import './styles.css';  // Ensure this file is correctly set up

const ExercisePage = () => {
  const [exerciseType, setExerciseType] = useState("");
  const [weight, setWeight] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState(""); // New state for Date
  const [error, setError] = useState("");
  const [collapsed, setCollapsed] = useState(false); // Manage sidebar collapse state

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
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Component */}
      <Box
        sx={{
          width: collapsed ? "60px" : "250px", // Sidebar width changes when collapsed
          height: "100vh", // Full height
          backgroundColor: "#3f51b5", // Sidebar color
          transition: "width 0.3s", // Smooth transition for collapse
          padding: "10px 20px",
        }}
      >
        <Box sx={{ padding: "10px", display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              visibility: collapsed ? "hidden" : "visible",
            }}
          >
            Exercise Sidebar
          </Typography>
          <IconButton onClick={() => setCollapsed(!collapsed)}>
            <MenuOutlinedIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>

        <Box sx={{ textAlign: "center", paddingTop: "20px" }}>
          <Avatar src={avatar} sx={{ width: 100, height: 100 }} />
          <Typography sx={{ color: "#fff", fontSize: "18px" }}>Test User</Typography>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          marginLeft: collapsed ? "60px" : "250px",
          padding: "20px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Exercise Tracker</h1>
        {error && <p className="error-message">{error}</p>}
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
            <label>Date</label>
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
      </Box>
    </Box>
  );
};

export default ExercisePage;
