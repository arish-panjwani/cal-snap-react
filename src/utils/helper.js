/** @format */

/** @format */

export function capitalizeFirstChar(str) {
  if (!str || typeof str !== "string") {
    return ""; // Handle empty or non-string input
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const debuggingMode = true;

export function formatDate(dateString) {
  // Parse the input date string into a Date object
  const date = new Date(dateString);

  // Check for invalid date
  if (isNaN(date)) {
    throw new Error("Invalid date string");
  }

  // Format the date using Intl.DateTimeFormat
  const options = { month: "short", day: "numeric", year: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

// Function to calculate BMI
function calculateBMI(weight, height) {
  return weight / (height * height);
}

//  Calculate Basal Metabolic Rate (BMR) using the Mifflin-St Jeor Equation
function calculateBMR(weight, height, age, gender) {
  if (gender === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (gender === "female") {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    throw new Error("Invalid gender. Please specify 'male' or 'female'.");
  }
}

// Function to calculate TDEE
/**
 * Calculate Total Daily Energy Expenditure (TDEE) based on activity level.
 * @param {number} bmr - Basal Metabolic Rate.
 * @param {string} activityLevel - Activity level ("sedentary", "lightly active", "moderately active", "very active", "super active").
 * @returns {number} - The calculated TDEE.
 */
function calculateTDEE(bmr, activityLevel) {
  const activityFactors = {
    sedentary: 1.2,
    "lightly active": 1.375,
    "moderately active": 1.55,
    "very active": 1.725,
    "super active": 1.9,
  };

  if (!activityFactors[activityLevel]) {
    throw new Error(
      "Invalid activity level. Choose from sedentary, lightly active, moderately active, very active, or super active."
    );
  }

  return bmr * activityFactors[activityLevel];
}

// Function to calculate calorie recommendations
/**
 * Calculate daily calorie recommendations for maintenance, weight loss, and weight gain.
 * @param {number} tdee - Total Daily Energy Expenditure.
 * @returns {object} - An object containing calorie recommendations.
 */
function calculateCalorieRecommendations(tdee) {
  return {
    maintenance: tdee,
    weightLoss: tdee - 500, // Reduce by 500 calories for weight loss
    weightGain: tdee + 500, // Increase by 500 calories for weight gain
  };
}

// Example Usage:
const weight = 70; // kg
const height = 1.75; // meters
const age = 30; // years
const gender = "male";
const activityLevel = "moderately active";

// Calculate BMI
const bmi = calculateBMI(weight, height);
console.log(`BMI: ${bmi.toFixed(2)}`);

// Calculate BMR
const bmr = calculateBMR(weight, height * 100, age, gender); // Convert height to cm for BMR
console.log(`BMR: ${bmr.toFixed(2)} calories/day`);

// Calculate TDEE
const tdee = calculateTDEE(bmr, activityLevel);
console.log(`TDEE: ${tdee.toFixed(2)} calories/day`);

// Calculate Calorie Recommendations
const calorieRecommendations = calculateCalorieRecommendations(tdee);
console.log(`Calorie Recommendations:`);
console.log(
  `  Maintenance: ${calorieRecommendations.maintenance.toFixed(2)} calories/day`
);
console.log(
  `  Weight Loss: ${calorieRecommendations.weightLoss.toFixed(2)} calories/day`
);
console.log(
  `  Weight Gain: ${calorieRecommendations.weightGain.toFixed(2)} calories/day`
);
