import React, { useState } from "react";
import { FaRunning, FaBicycle, FaSwimmer, FaDumbbell, FaYinYang } from "react-icons/fa"; // Importing specific icons
import './styles.css';  // Import your CSS file
import { Box, Typography, useMediaQuery, useTheme, Button, TextField } from "@mui/material";
import { Header } from "../../components";
import { tokens } from "../../theme";
import { Formik } from "formik";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

const Exercise = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm({
      values: initialValues,
    });
  };

  const [exerciseType, setExerciseType] = useState("");
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [error, setError] = useState("");

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Validate inputs
  //   if (isNaN(duration) || isNaN(calories) || isNaN(weight)) {
  //     setError("Please enter valid numbers for Duration, Calories, and Weight.");
  //     return;
  //   }
  //   setError("");

  //   // Log the data for now
  //   console.log(`Exercise: ${exerciseType}, Weight: ${weight}, Duration: ${duration}, Calories: ${calories}`);
  //   // Reset the form
  //   setExerciseType("");
  //   setWeight("");
  //   setDuration("");
  //   setCalories("");
  // };

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
    <Box m="20px">
      <Header title="LOG EXERCISE" subtitle="Track your exercise activity" />
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        // validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={touched.firstName && errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{
                  gridColumn: "span 2",
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={touched.lastName && errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={touched.email && errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={touched.contact && errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={touched.address1 && errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={touched.address2 && errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="end"
              mt="20px"
            >
              <Button type="submit" color="secondary" variant="contained">
                Submit Activity
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
    // <div className="exercise-container">
    //   <h1>Exercise Tracker</h1>
    //   {error && <p className="error">{error}</p>} {/* Display error message */}
    //   <form onSubmit={handleSubmit} className="exercise-form">
    //     <div className="form-group">
    //       <label>Type of Exercise</label>
    //       <select
    //         value={exerciseType}
    //         onChange={(e) => setExerciseType(e.target.value)}
    //         className="input-field"
    //         required
    //       >
    //         <option value="">Select an exercise</option>
    //         {exercises.map((exercise, index) => (
    //           <option key={index} value={exercise.name}>
    //             {exercise.icon} {exercise.name}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //     <div className="form-group">
    //       <label>Weight (in kg)</label>
    //       <input
    //         type="number"
    //         value={weight}
    //         onChange={(e) => setWeight(e.target.value)}
    //         placeholder="e.g., 70"
    //         className="input-field"
    //         required
    //         min="0" // Ensure no negative weight
    //       />
    //     </div>

    //     <div className="form-group">
    //       <label>Duration (in minutes)</label>
    //       <input
    //         type="number"
    //         value={duration}
    //         onChange={(e) => setDuration(e.target.value)}
    //         placeholder="e.g., 30"
    //         className="input-field"
    //         required
    //       />
    //     </div>

    //     <div className="form-group">
    //       <label>Calories Burnt</label>
    //       <input
    //         type="number"
    //         value={calories}
    //         onChange={(e) => setCalories(e.target.value)}
    //         placeholder="e.g., 300"
    //         className="input-field"
    //         required
    //       />
    //     </div>

        

    //     <button type="submit" className="submit-btn">
    //       <FaDumbbell /> Log Exercise
    //     </button>
    //   </form>
    // </div>
  );
};

export default Exercise;
