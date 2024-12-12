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
    bmi: "",
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

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      alert("Please fill out all required fields for this step.");
    }
  };

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
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0: // Basic Info
        return (
          <Box>
            <div className="input-field">
              <label htmlFor="weight">Weight</label>
              <input
                type="number"
                id="weight"
                name="weight"
                placeholder="Enter your weight"
                value={formData.weight}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="height">Height</label>
              <input
                type="number"
                id="height"
                name="height"
                placeholder="Enter your height"
                value={formData.height}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="bmi">BMI</label>
              <input
                type="text"
                id="bmi"
                name="bmi"
                placeholder="Enter your BMI"
                value={formData.bmi}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="waistCircumference">Waist Circumference</label>
              <input
                type="number"
                id="waistCircumference"
                name="waistCircumference"
                placeholder="Enter your waist circumference"
                value={formData.waistCircumference}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="hipCircumference">Hip Circumference</label>
              <input
                type="number"
                id="hipCircumference"
                name="hipCircumference"
                placeholder="Enter your hip circumference"
                value={formData.hipCircumference}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </Box>
        );
      case 1: // Lifestyle Info
        return (
          <Box>
            <div className="input-field">
              <label htmlFor="alcoholConsumption">Alcohol Consumption</label>
              <select
                id="alcoholConsumption"
                name="alcoholConsumption"
                value={formData.alcoholConsumption}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select</option>
                <option value="none">None</option>
                <option value="moderate">Moderate</option>
                <option value="heavy">Heavy</option>
              </select>
            </div>
            <div className="input-field">
              <label htmlFor="monthlyEatingOutSpending">
                Monthly Eating Out Spending
              </label>
              <input
                type="number"
                id="monthlyEatingOutSpending"
                name="monthlyEatingOutSpending"
                placeholder="Enter amount"
                value={formData.monthlyEatingOutSpending}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="minutes_walk_bicycle">Minutes Walk/Bicycle</label>
              <input
                type="number"
                id="minutes_walk_bicycle"
                name="minutes_walk_bicycle"
                placeholder="Enter minutes"
                value={formData.minutes_walk_bicycle}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="minutes_doing_recreational_activities">
                Minutes Doing Recreational Activities
              </label>
              <input
                type="number"
                id="minutes_doing_recreational_activities"
                name="minutes_doing_recreational_activities"
                placeholder="Enter minutes"
                value={formData.minutes_doing_recreational_activities}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="sleep_hours_weekend">Sleep Hours Weekend</label>
              <input
                type="number"
                id="sleep_hours_weekend"
                name="sleep_hours_weekend"
                placeholder="Enter hours"
                value={formData.sleep_hours_weekend}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="no_of_cigarettes_perday">
                Number of Cigarettes Per Day
              </label>
              <input
                type="number"
                id="no_of_cigarettes_perday"
                name="no_of_cigarettes_perday"
                placeholder="Enter number"
                value={formData.no_of_cigarettes_perday}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </Box>
        );
      case 2: // Family History
        return (
          <Box>
            <div className="input-field">
              <label htmlFor="marital_status">Marital Status</label>
              <select
                id="marital_status"
                name="marital_status"
                value={formData.marital_status}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
              </select>
            </div>
            <div className="input-field">
              <label htmlFor="family_size">Family Size</label>
              <input
                type="number"
                id="family_size"
                name="family_size"
                placeholder="Enter family size"
                value={formData.family_size}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="family_income">Family Income</label>
              <input
                type="number"
                id="family_income"
                name="family_income"
                placeholder="Enter family income"
                value={formData.family_income}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="input-field">
              <label>Family History</label>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.familyHistory.hasDiabetes}
                    onChange={handleFamilyHistoryChange}
                    name="hasDiabetes"
                  />
                }
                label="Has Diabetes"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.familyHistory.hasBP}
                    onChange={handleFamilyHistoryChange}
                    name="hasBP"
                  />
                }
                label="Has Blood Pressure"
              />
            </div>
          </Box>
        );
      case 3: // Address
        return (
          <Box>
            <div className="input-field">
              <label htmlFor="houseAddress">House Address</label>
              <input
                type="text"
                id="houseAddress"
                name="houseAddress"
                placeholder="Enter your house address"
                value={formData.houseAddress}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="province">Province</label>
              <input
                type="text"
                id="province"
                name="province"
                placeholder="Enter your province"
                value={formData.province}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="IN">India</option>
                <option value="UK">United Kingdom</option>
              </select>
            </div>
            <div className="input-field">
              <label htmlFor="pinCode">PIN Code</label>
              <input
                type="text"
                id="pinCode"
                name="pinCode"
                placeholder="Enter your PIN Code"
                value={formData.pinCode}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </Box>
        );
      case 4: // Health Target
        return (
          <Box>
            <div className="input-field">
              <label htmlFor="calBurnedTarget">Calories Burned Target</label>
              <input
                type="number"
                id="calBurnedTarget"
                name="calBurnedTarget"
                placeholder="Enter target calories burned"
                value={formData.calBurnedTarget}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="calConsumptionsTarget">Calories Consumption Target</label>
              <input
                type="number"
                id="calConsumptionsTarget"
                name="calConsumptionsTarget"
                placeholder="Enter target calories consumption"
                value={formData.calConsumptionsTarget}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </Box>
        );
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="container">
      <h1>Profile Setup</h1>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {renderStepContent(activeStep)}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
          }}
        >
          {activeStep !== 0 && (
            <Button onClick={handleBack} variant="outlined">
              Back
            </Button>
          )}
          <Button
            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            variant="contained"
          >
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Profile;
