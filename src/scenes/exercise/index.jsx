import React, { useState } from "react";
import { FaRunning, FaBicycle, FaSwimmer, FaDumbbell, FaYinYang } from "react-icons/fa"; // Importing specific icons
import './styles.css';  // Import your CSS file
import { Box, Typography, useMediaQuery, useTheme, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Header } from "../../components";
import { tokens } from "../../theme";
import { Formik } from "formik";

const initialValues = {
  exerciseType: "",
  weight: "",
  duration: "",
  calories: "",
  date: "",
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
    { name: "Jump Rope", icon: <FaRunning /> },
  ];

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

  return (
    <Box m="20px"
    display="flex"
    flexDirection="column"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start"
        }}
      >
        <Header title="LOG EXERCISE" subtitle="Track your exercise activity" />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          padding: "20px",
          borderRadius: "8px"
        }}
      >
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
                display="flex"
                flexDirection="column" // Stack fields vertically
                gap="16px"  // Reduce space between fields
              >
              <FormControl fullWidth sx={{ gridColumn: "span 1" }}>
                <InputLabel>Exercise Type</InputLabel>
                <Select
                  value={values.exerciseType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="exerciseType"
                  label="Exercise Type"
                  error={touched.exerciseType && Boolean(errors.exerciseType)}
                >
                  {exercises.map((exercise, index) => (
                    <MenuItem key={index} value={exercise.name}>
                      {exercise.icon} {exercise.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Weight (kg)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.weight}
                name="weight"
                error={touched.weight && Boolean(errors.weight)}
                helperText={touched.weight && errors.weight}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Calories Burnt"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.calories}
                name="calories"
                error={touched.calories && Boolean(errors.calories)}
                helperText={touched.calories && errors.calories}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                name="date"
                error={touched.date && Boolean(errors.date)}
                helperText={touched.date && errors.date}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="time"
                label="Start Time"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.startTime}
                name="startTime"
                error={touched.startTime && Boolean(errors.startTime)}
                helperText={touched.startTime && errors.startTime}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="time"
                label="End Time"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.endTime}
                name="endTime"
                error={touched.endTime && Boolean(errors.endTime)}
                helperText={touched.endTime && errors.endTime}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="end"
              mt="20px"
            >
              <Button type="submit" color="secondary" variant="contained">
                Log Exercise
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      </Box>
      </Box>
    </Box> 
  );
};

export default Exercise;
