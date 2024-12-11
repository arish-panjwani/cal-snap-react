/** @format */

import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
} from "@mui/material";

const steps = ["Basic Info", "Lifestyle Info", "Family History"];

const Profile = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    bmi: "",
    waistCircumference: "",
    hipCircumference: "",
    gender: "",
    maritalStatus: "",
    familySize: "",
    familyIncome: "",
    alcoholConsumption: "",
    monthlyEatingOutSpending: "",
    minutesWalkBicycle: "",
    minutesRecreationalActivities: "",
    sleepHoursWeekdays: "",
    sleepHoursWeekend: "",
    cigarettesPerDay: "",
    familyHistory: {
      hasDiabetes: false,
      hasBP: false,
      hasHeartDisease: false,
      hasCancer: false,
      anyOther: "",
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFamilyHistoryChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      familyHistory: {
        ...prevFormData.familyHistory,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);
  const handleSubmit = () => console.log("Form Data:", formData);

  const renderStepContent = (step) => {
    switch (step) {
      case 0: // Basic Info
        return (
          <Box>
            <TextField
              label="Weight (kg)"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Height (cm)"
              name="height"
              value={formData.height}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="BMI"
              name="bmi"
              value={formData.bmi}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Waist Circumference (cm)"
              name="waistCircumference"
              value={formData.waistCircumference}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Hip Circumference (cm)"
              name="hipCircumference"
              value={formData.hipCircumference}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      case 1: // Lifestyle Info
        return (
          <Box>
            <TextField
              label="Alcohol Consumption"
              name="alcoholConsumption"
              value={formData.alcoholConsumption}
              onChange={handleChange}
              select
              fullWidth
              margin="normal">
              <MenuItem value="Regular">Regular</MenuItem>
              <MenuItem value="Casual">Casual</MenuItem>
              <MenuItem value="Occasional">Occasional</MenuItem>
            </TextField>
            <TextField
              label="Money Spent on Eating Out"
              name="monthlyEatingOutSpending"
              value={formData.monthlyEatingOutSpending}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      case 2: // Family History
        return (
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.familyHistory.hasDiabetes}
                  onChange={handleFamilyHistoryChange}
                  name="hasDiabetes"
                />
              }
              label="Family Has Diabetes"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.familyHistory.hasBP}
                  onChange={handleFamilyHistoryChange}
                  name="hasBP"
                />
              }
              label="Family Has BP"
            />
          </Box>
        );
      default:
        return "Unknown Step";
    }
  };

  return (
    <Box sx={{ width: "100%", margin: "auto", maxWidth: 600 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 2, mb: 1 }}>{renderStepContent(activeStep)}</Box>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        {activeStep === steps.length - 1 ? (
          <Button onClick={handleSubmit}>Submit</Button>
        ) : (
          <Button onClick={handleNext}>Next</Button>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
