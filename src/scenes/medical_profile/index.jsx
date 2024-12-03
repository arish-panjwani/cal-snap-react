/** @format */

import React, { useState } from "react";
import "./index.css"; // Importing the main stylesheet

function MedicalProfile() {
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
    hasDiabetes: false,
    hasBP: false,
    hasCholesterol: false,
    otherDisease: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="heading">Health Profile Form</h2>

        {/* Basic Info Section */}
        <div className="section">
          <h3>Basic Info</h3>
          <label>
            <span>Weight (kg):</span>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Enter your weight"
            />
          </label>
          <label>
            <span>Height (cm):</span>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="Enter your height"
            />
          </label>
          <label>
            <span>BMI:</span>
            <input
              type="text"
              name="bmi"
              value={formData.bmi}
              onChange={handleChange}
              placeholder="Enter your BMI"
            />
          </label>
          <label>
            <span>Waist Circumference (cm):</span>
            <input
              type="number"
              name="waistCircumference"
              value={formData.waistCircumference}
              onChange={handleChange}
              placeholder="Enter waist circumference"
            />
          </label>
          <label>
            <span>Hip Circumference (cm):</span>
            <input
              type="number"
              name="hipCircumference"
              value={formData.hipCircumference}
              onChange={handleChange}
              placeholder="Enter hip circumference"
            />
          </label>
          <label>
            <span>Gender:</span>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <label>
            <span>Marital Status:</span>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}>
              <option value="">Select Marital Status</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
              <option value="Divorced">Divorced</option>
              <option value="Separated">Separated</option>
              <option value="Never married">Never married</option>
              <option value="Living with partner">Living with partner</option>
            </select>
          </label>
          <label>
            <span>Family Size:</span>
            <input
              type="number"
              name="familySize"
              value={formData.familySize}
              onChange={handleChange}
              placeholder="Enter family size"
            />
          </label>
          <label>
            <span>Family Income:</span>
            <select
              name="familyIncome"
              value={formData.familyIncome}
              onChange={handleChange}>
              <option value="">Select Family Income</option>
              <option value="Low">Low</option>
              <option value="Middle">Middle</option>
              <option value="High">High</option>
            </select>
          </label>
        </div>

        {/* Lifestyle Info Section */}
        <div className="section">
          <h3>Lifestyle Info</h3>
          <label>
            <span>Alcohol Consumption:</span>
            <select
              name="alcoholConsumption"
              value={formData.alcoholConsumption}
              onChange={handleChange}>
              <option value="">Select Alcohol Consumption</option>
              <option value="Regular">Regular</option>
              <option value="Casual">Casual</option>
              <option value="Occasional">Occasional</option>
            </select>
          </label>
          <label>
            <span>Money spent on eating out (in the past 30 days):</span>
            <input
              type="number"
              name="monthlyEatingOutSpending"
              value={formData.monthlyEatingOutSpending}
              onChange={handleChange}
              placeholder="Enter amount"
            />
          </label>
          <label>
            <span>Minutes spent on walking or bicycle:</span>
            <input
              type="number"
              name="minutesWalkBicycle"
              value={formData.minutesWalkBicycle}
              onChange={handleChange}
              placeholder="Enter minutes"
            />
          </label>
          <label>
            <span>Minutes doing recreational activities:</span>
            <input
              type="number"
              name="minutesRecreationalActivities"
              value={formData.minutesRecreationalActivities}
              onChange={handleChange}
              placeholder="Enter minutes"
            />
          </label>
          <label>
            <span>Sleep hours on weekdays:</span>
            <input
              type="number"
              name="sleepHoursWeekdays"
              value={formData.sleepHoursWeekdays}
              onChange={handleChange}
              placeholder="Enter hours"
            />
          </label>
          <label>
            <span>Sleep hours on weekends:</span>
            <input
              type="number"
              name="sleepHoursWeekend"
              value={formData.sleepHoursWeekend}
              onChange={handleChange}
              placeholder="Enter hours"
            />
          </label>
          <label>
            <span>No of cigarettes smoked per day:</span>
            <input
              type="number"
              name="cigarettesPerDay"
              value={formData.cigarettesPerDay}
              onChange={handleChange}
              placeholder="Enter number of cigarettes"
            />
          </label>
        </div>

        {/* Family History Section */}
        <div className="section">
          <h3>Family History</h3>
          <label>
            <span>Family Has Diabetes:</span>
            <input
              type="checkbox"
              name="hasDiabetes"
              checked={formData.familyHistory.hasDiabetes}
              onChange={handleFamilyHistoryChange}
            />
          </label>
          <label>
            <span>Family Has BP:</span>
            <input
              type="checkbox"
              name="hasBP"
              checked={formData.familyHistory.hasBP}
              onChange={handleFamilyHistoryChange}
            />
          </label>
          <label>
            <span>Family Has Heart Disease:</span>
            <input
              type="checkbox"
              name="hasHeartDisease"
              checked={formData.familyHistory.hasHeartDisease}
              onChange={handleFamilyHistoryChange}
            />
          </label>
          <label>
            <span>Family Has Cancer:</span>
            <input
              type="checkbox"
              name="hasCancer"
              checked={formData.familyHistory.hasCancer}
              onChange={handleFamilyHistoryChange}
            />
          </label>
          <label>
            <span>Any Other Family History:</span>
            <input
              type="text"
              name="anyOther"
              value={formData.familyHistory.anyOther}
              onChange={handleFamilyHistoryChange}
              placeholder="Specify other conditions"
            />
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    </div>
  );
}

export default MedicalProfile;
