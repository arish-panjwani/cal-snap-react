import React from "react";
import { useNavigate } from 'react-router-dom';
import "./styles.css";

function CalorieConsumed() {
  const navigate = useNavigate();

  // Placeholder data for meal image, link, and nutritional info
  const mealImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDLMlIIsJEmaHMA0cpAaOcjbliIyjkfjhg6g&s"; // Replace with actual image URL
  const appleLink = "https://en.wikipedia.org/wiki/Apple"; // Link to apple page
  
  const nutritionInfo = {
    servingSize: "100 grams",
    calories: 52,
    nutrients: [
      { name: "Total Fat", value: "0.2 g", dailyValue: "0%" },
      { name: "Saturated Fat", value: "0 g", dailyValue: "0%" },
      { name: "Cholesterol", value: "0 mg", dailyValue: "0%" },
      { name: "Sodium", value: "1 mg", dailyValue: "0%" },
      { name: "Potassium", value: "107 mg", dailyValue: "3%" },
      { name: "Total Carbohydrate", value: "14 g", dailyValue: "4%" },
      { name: "Dietary Fiber", value: "2.4 g", dailyValue: "9%" },
      { name: "Sugar", value: "10 g" },
      { name: "Protein", value: "0.3 g", dailyValue: "0%" },
      { name: "Vitamin C", value: "", dailyValue: "7%" },
      { name: "Calcium", value: "", dailyValue: "0%" },
      { name: "Iron", value: "", dailyValue: "0%" },
      { name: "Vitamin D", value: "", dailyValue: "0%" },
      { name: "Vitamin B6", value: "", dailyValue: "0%" },
      { name: "Cobalamin", value: "", dailyValue: "0%" },
      { name: "Magnesium", value: "", dailyValue: "1%" },
    ]
  };

  return (
    <div className="calorie-consumed-container">
      {/* Meal Image */}
      <div className="meal-image-container">
        <img src={mealImageUrl} alt="Meal" className="meal-image" />
      </div>

      {/* Nutritional Information */}
      <div className="nutrition-info">
        <h1>Nutrition Information</h1>
        <p>(Amount Per {nutritionInfo.servingSize})</p>
        <h3>Calories: {nutritionInfo.calories}</h3>
        
        {nutritionInfo.nutrients.map((nutrient, index) => (
          <h3 key={index}>
            {nutrient.name}: {nutrient.value} {nutrient.dailyValue && `(${nutrient.dailyValue})`}
          </h3>
        ))}
              
      </div>
    </div>
  );
}

export default CalorieConsumed;
