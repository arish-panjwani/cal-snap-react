/** @format */

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { URLs } from "../../api/apiConstant";
import { APIRequest, setAnyCookie, handleLogin } from "../../api/helper";
import { debuggingMode } from "../../utils/helper";

const steps = [
  "Basic Info",
  "Lifestyle Info",
  "Family History",
  "Address",
  "Health Target",
];

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve user data from the previous page
  const { profile_data } = location.state || {};
  const { firstName, lastName, email, dob, password, mobileNumber } =
    profile_data || {};

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    waistCircumference: "",
    hipCircumference: "",
    gender: "",
    alcoholConsumption: "",
    monthlyEatingOutSpending: "",
    minutes_walk_bicycle: "",
    minutes_doing_recreational_activities: "",
    sleep_hours_weekend: "",
    no_of_cigarettes_perday: "",
    familyHistory: {
      hasDiabetes: false,
      hasBP: false,
    },
    marital_status: "",
    family_size: "",
    family_income: "",
    pinCode: "",
    houseAddress: "",
    city: "",
    province: "",
    country: "",
    calBurnedTarget: "",
    calConsumptionsTarget: "",
  });

  // WITH DUMMY DATA FOR TESTING
  // const [formData, setFormData] = useState({
  //   weight: "78",
  //   height: "171",
  //   bmi: "25",
  //   waistCircumference: "38",
  //   hipCircumference: "40",
  //   gender: "Male",
  //   alcoholConsumption: "Never",
  //   monthlyEatingOutSpending: "400",
  //   minutes_walk_bicycle: "60",
  //   minutes_doing_recreational_activities: "60",
  //   sleep_hours_weekend: "60",
  //   no_of_cigarettes_perday: "0",
  //   familyHistory: {
  //     hasDiabetes: false,
  //     hasBP: false,
  //   },
  //   marital_status: "Single",
  //   family_size: "5",
  //   family_income: "30000",
  //   pinCode: "410006",
  //   houseAddress: "43",
  //   city: "toronto",
  //   province: "ON",
  //   country: "CA",
  // });

  const [age, setAge] = useState(null);

  // Calculate age from DOB
  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      const calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        setAge(calculatedAge - 1);
      } else {
        setAge(calculatedAge);
      }
    }
  }, [dob]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFamilyHistoryChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      familyHistory: {
        ...prevFormData.familyHistory,
        [name]: checked,
      },
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 0: // Basic Info
        return (
          formData.weight &&
          formData.height &&
          formData.bmi &&
          formData.waistCircumference &&
          formData.hipCircumference &&
          formData.gender
        );
      case 1: // Lifestyle Info
        return (
          formData.alcoholConsumption &&
          formData.monthlyEatingOutSpending &&
          formData.minutes_walk_bicycle &&
          formData.minutes_doing_recreational_activities &&
          formData.sleep_hours_weekend &&
          formData.no_of_cigarettes_perday
        );
      case 2: // Family History
        return (
          formData.marital_status &&
          formData.family_size &&
          formData.family_income
        );
      case 3: // Address
        return (
          formData.pinCode &&
          formData.houseAddress &&
          formData.city &&
          formData.province &&
          formData.country
        );
      default:
        return false;
    }
  };

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleSubmit = async () => {
    const payload = {
      first_name: firstName || "null",
      last_name: lastName || "null",
      email: email || "null",
      dob: dob || "null",
      password: password || "null",
      age: age || "null",
      gender: formData.gender || "null",
      height: formData.height || "null",
      weight: formData.weight || "null",
      bmi: formData.bmi || "null",
      waist_circumference: formData.waistCircumference || "null",
      hip_circumference: formData.hipCircumference || "null",
      marital_status: formData.marital_status || "null",
      family_size: formData.family_size || "null",
      family_income: formData.family_income || "null",
      alcohol_consumption: formData.alcoholConsumption || "null",
      monthly_eatingout_spending: formData.monthlyEatingOutSpending || "null",
      minutes_walk_bicycle: formData.minutes_walk_bicycle || "null",
      minutes_doing_recreational_activities:
        formData.minutes_doing_recreational_activities || "null",
      sleep_hours_weekend: formData.sleep_hours_weekend || "null",
      no_of_cigarettes_perday: formData.no_of_cigarettes_perday || "null",
      pinCode: formData.pinCode || "null",
      houseAddress: formData.houseAddress || "null",
      city: formData.city || "null",
      province: formData.province || "null",
      country: formData.country || "null",
      mobile_number: mobileNumber || "null",
      has_diabetes: formData.familyHistory.hasDiabetes || false,
      has_bp: formData.familyHistory.hasBP || false,
      calBurnedTarget: formData.calBurnedTarget || "null",
      calConsumptionsTarget: formData.calConsumptionsTarget || "null",
    };

    debuggingMode && console.log("Payload:", JSON.stringify(payload));

    try {
      const data = await APIRequest(URLs.ADD_USER.URL, "POST", payload);
      if (data.statusCode == "200") {
        handleLogin(String(data.data.id));
        setAnyCookie("first_name", data.data.first_name);
        setAnyCookie("email", data.data.email);
        setAnyCookie("bmi", data.data.bmi);
        setAnyCookie("weight", data.data.weight);
        setAnyCookie("height", data.data.height);
        setAnyCookie("age", data.data.age);
        setAnyCookie("gender", data.data.gender);
        debuggingMode && console.log("Login successful");
        navigate("/dashboard");
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    } finally {
      //   setIsLoggingIn(false);
    }
  };

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
              label="Waist Circumference (inches)"
              name="waistCircumference"
              value={formData.waistCircumference}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Hip Circumference (inches)"
              name="hipCircumference"
              value={formData.hipCircumference}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              select
              fullWidth
              margin="normal">
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
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
              <MenuItem value="Never">Never</MenuItem>
            </TextField>
            <TextField
              label="Money Spent Monthly on Eating Out"
              name="monthlyEatingOutSpending"
              value={formData.monthlyEatingOutSpending}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Minutes Walk/Bicycle per Day"
              name="minutes_walk_bicycle"
              value={formData.minutes_walk_bicycle}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Minutes Doing Recreational Activities per Day"
              name="minutes_doing_recreational_activities"
              value={formData.minutes_doing_recreational_activities}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Sleep Hours on Weekend"
              name="sleep_hours_weekend"
              value={formData.sleep_hours_weekend}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="No. of Cigarettes per Day"
              name="no_of_cigarettes_perday"
              value={formData.no_of_cigarettes_perday}
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
            <TextField
              label="Marital Status"
              name="marital_status"
              value={formData.marital_status}
              onChange={handleChange}
              select
              fullWidth
              margin="normal">
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="Divorced">Divorced</MenuItem>
            </TextField>
            <TextField
              label="Family Size"
              name="family_size"
              value={formData.family_size}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Family Income (CAD)"
              name="family_income"
              value={formData.family_income}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      case 3: // Address
        return (
          <Box>
            <TextField
              label="House Address"
              name="houseAddress"
              value={formData.houseAddress}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Pin Code"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      case 4: // Health Target
        return (
          <Box>
            <TextField
              label="Calorie Burnt Target"
              name="calBurnedTarget"
              value={formData.calBurnedTarget}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Calorie Consumption Target"
              name="calConsumptionsTarget"
              value={formData.calConsumptionsTarget}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      default:
        return "Unknown Step";
    }
  };

  return (
    <Box sx={{ width: "100%", margin: "auto", maxWidth: 600 }}>
      <h3>Welcome {firstName || "User"}!</h3>
      <p>Email: {email || "Not provided"}</p>
      <p>Date of Birth: {dob || "Not provided"}</p>
      <p>Age: {age || "Not calculated"}</p>
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
          <Button onClick={handleNext} disabled={!validateStep(activeStep)}>
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Profile;

// API response for reference
// {
//     "first_name": "Mukul",
//     "last_name": "Garg",
//     "age": 27,
//     "dob": "11-07-1997",
//     "gender": "Male",
//     "password": "pass",
//     "mobile_number": "114234567790",
//     "email": "mukulgarg155@gmail.com",
//     "active": true,
//     "admin": true,
//     "pinCode": "L6Y 4R6",
//     "houseAddress": "103, Beaconsfield Ave",
//     "city": "Brampton",
//     "province": "Ontario",
//     "country": "Canada",
//     "height": 186.0,
//     "weight": 95.0,
//     "bmi": 25.1,
//     "waist_circumference": 34.0,
//     "hip_circumference": 38.0,
//     "marital_status": "Married",
//     "family_size": 2.0,
//     "family_income": 100000.0,
//     "alcohol_consumption": "Occassionaly",
//     "monthly_eatingout_spending": 500.0,
//     "minutes_walk_bicycle": 0.0,
//     "minutes_doing_recreational_activities": 0.0,
//     "sleep_hours_weekdays": 8.0,
//     "sleep_hours_weekend": 9.0,
//     "no_of_cigarettes_perday": 0.0,
//     "family_history_has_BP": false,
//     "family_history_has_diabetes": false
// }
