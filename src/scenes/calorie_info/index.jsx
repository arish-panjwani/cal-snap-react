/** @format */

import { Box, Button, Modal, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { APIRequest, getAnyCookie } from "../../api/helper";
import { Header } from "../../components";
import { tokens } from "../../theme";
import { capitalizeFirstChar } from "../../utils/helper";
import { URLs } from "../../api/apiConstant";

function CalorieInfo() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const navigate = useNavigate();

  const { image, foodDetails } = location.state || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1); // Default to 1
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [updatedFoodDetails, setUpdatedFoodDetails] = useState({});

  useEffect(() => {
    if (foodDetails) {
      const multiplier = calculateMultiplier(quantity.toString());
      setUpdatedFoodDetails({
        ...foodDetails,
        weight: parseFloat(foodDetails.weight || 0) * multiplier,
        calories: parseFloat(foodDetails.calories || 0) * multiplier,
        protein: parseFloat(foodDetails.protein || 0) * multiplier,
        fat: parseFloat(foodDetails.fat || 0) * multiplier,
        carbs: parseFloat(foodDetails.carbs || 0) * multiplier,
        cholesterol: parseFloat(foodDetails.cholesterol || 0) * multiplier,
        sodium: parseFloat(foodDetails.sodium || 0) * multiplier,
      });
    }
  }, [foodDetails, quantity]); // Recompute on `foodDetails` or `quantity` change

  const handleSave = async () => {
    const {
      weight,
      calories,
      protein,
      fat,
      carbs,
      cholesterol,
      sodium,
      itemName,
    } = updatedFoodDetails || {};

    let payload = {
      itemName,
      date: selectedDate,
      time: selectedTime,
      caloriesConsumed: calories,
      userId: getAnyCookie("userId"),
      itemWeightConsumed: weight,
      carbs,
      protein,
      fat,
      sodium,
      cholesterol,
    };

    console.info("Payload to save food details", payload);
    try {
      var response = await APIRequest(
        URLs.POST_FOOD_ITEM_NUTRIENTS.URL,
        URLs.POST_FOOD_ITEM_NUTRIENTS.METHOD,
        payload
      );

      if (response.statusCode === "200") {
        setIsModalOpen(true); // Open modal on success
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Failed to save food details", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/calorie-history"); // Navigate to the home page
  };

  const handleInputChange = (e) => {
    const value = parseFloat(e.target.value) || 0; // Ensure a valid number
    setQuantity(value);
  };

  function extractNumber(input) {
    const number = parseFloat(input.replace(/[^\d.]/g, ""));
    return number;
  }

  const calculateMultiplier = (val) => {
    if (!val) return 0; // Handle empty or undefined values
    const number = extractNumber(val);
    if (val.includes("mg")) {
      return number / 1000; // mg to g
    } else if (val.includes("kg")) {
      return number * 1000; // kg to g
    } else if (val.includes("g")) {
      return number; // Already in grams
    } else {
      return number; // Default case
    }
  };

  return (
    <Box p="20px">
      <Box display="flex" alignItems="center" justifyContent="center">
        <Header title="Nutrients Information" />
      </Box>

      {image && (
        <Box textAlign="center" mb={4}>
          <img
            src={image}
            alt="Uploaded"
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "10px",
              border: "5px solid #4BCEAC",
            }}
          />
        </Box>
      )}

      {foodDetails && (
        <Box
          bgcolor={colors.primary[400]}
          p={4}
          borderRadius="10px"
          mb={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center">
          <Typography
            variant="h4"
            color={colors.primary[100]}
            mb={0}
            fontWeight="bold"
            textAlign="center">
            {`Nutrients details for ${quantity} ${
              quantity > 1 ? "items" : "item"
            }`}
          </Typography>
          <Typography
            variant="h4"
            color={colors.primary[100]}
            mb={2}
            fontWeight="bold"
            textAlign="center">
            {`${capitalizeFirstChar(foodDetails.itemName)}: ${
              typeof updatedFoodDetails.weight === "number"
                ? updatedFoodDetails.weight.toFixed(2)
                : "N/A"
            } g`}
          </Typography>

          <table
            style={{
              width: "100%",
              textAlign: "center",
              borderCollapse: "collapse",
            }}>
            <thead style={{ fontSize: "20px" }}>
              <tr>
                <th
                  style={{
                    borderBottom: "2px solid white",
                    padding: "10px",
                    color: colors.primary[100],
                  }}>
                  Nutrient
                </th>
                <th
                  style={{
                    borderBottom: "2px solid white",
                    padding: "10px",
                    color: colors.primary[100],
                  }}>
                  Value
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "15px" }}>
              <tr>
                <td style={{ padding: "10px", color: colors.primary[100] }}>
                  Calories
                </td>
                <td style={{ padding: "10px", color: colors.primary[100] }}>
                  {typeof updatedFoodDetails.calories === "number"
                    ? `${updatedFoodDetails.calories.toFixed(2)} kcal`
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px", color: colors.primary[100] }}>
                  Protein
                </td>
                <td style={{ padding: "10px", color: colors.primary[100] }}>
                  {typeof updatedFoodDetails.protein === "number"
                    ? `${updatedFoodDetails.protein.toFixed(2)} g`
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px", color: colors.primary[100] }}>
                  Fat
                </td>
                <td style={{ padding: "10px", color: colors.primary[100] }}>
                  {typeof updatedFoodDetails.fat === "number"
                    ? `${updatedFoodDetails.fat.toFixed(2)} g`
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px", color: colors.primary[100] }}>
                  Carbs
                </td>
                <td style={{ padding: "10px", color: colors.primary[100] }}>
                  {typeof updatedFoodDetails.carbs === "number"
                    ? `${updatedFoodDetails.carbs.toFixed(2)} g`
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px", color: colors.primary[100] }}>
                  Cholesterol
                </td>
                <td style={{ padding: "10px", color: colors.primary[100] }}>
                  {typeof updatedFoodDetails.cholesterol === "number"
                    ? `${updatedFoodDetails.cholesterol.toFixed(2)} g`
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px", color: colors.primary[100] }}>
                  Sodium
                </td>
                <td style={{ padding: "10px", color: colors.primary[100] }}>
                  {typeof updatedFoodDetails.sodium === "number"
                    ? `${updatedFoodDetails.sodium.toFixed(2)} g`
                    : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      )}

      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap="10px">
        <input
          type="number"
          id="quantity"
          value={quantity}
          step="0.01" // Allow floating-point values
          min="0" // Ensure no negative values
          onChange={handleInputChange}
          placeholder="Enter the amount of food consumed:"
          style={{ width: "100%", padding: "10px" }}
        />
      </Box>

      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap="10px">
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          placeholder="Select Date"
          style={{ flex: 1, padding: "10px" }}
        />

        <input
          type="time"
          id="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          placeholder="Select Time"
          style={{ flex: 1, padding: "10px" }}
        />
      </Box>

      <Box textAlign="center">
        <Button
          disabled={quantity <= 0 || !selectedDate || !selectedTime}
          variant="contained"
          sx={{
            bgcolor: colors.greenAccent[500],
            color: "black",
            fontWeight: "bold",
            fontSize: "16px",
            p: "10px 24px",
            ":hover": {
              bgcolor: colors.greenAccent[700],
            },
          }}
          onClick={handleSave}>
          {`Save`}
        </Button>
      </Box>

      {/* Success Modal */}
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: 400,
            bgcolor: colors.primary[400],
            border: "2px solid",
            borderColor: colors.greenAccent[500],
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
          }}>
          <Typography
            variant="h6"
            textAlign="center"
            color={colors.primary[100]}
            mb={3}>
            {`Food Consumed and Digested Successfully!`}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: colors.greenAccent[500],
              color: "black",
              fontWeight: "bold",
              p: "12px",
              ":hover": {
                bgcolor: colors.greenAccent[700],
              },
            }}
            onClick={handleModalClose}>
            {`Okay`}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default CalorieInfo;
