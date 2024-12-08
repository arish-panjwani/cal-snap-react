/** @format */

import React, { useState } from "react";
import { Box, Typography, Button, Modal, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { Header } from "../../components";

function CalorieInfo() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const navigate = useNavigate();

  const { image, foodDetails } = location.state || {};

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dummy API call simulation
  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating network latency
      setIsModalOpen(true); // Open modal on success
    } catch (error) {
      console.error("Failed to save food details", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/"); // Navigate to the home page
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
        <Box bgcolor={colors.primary[400]} p={4} borderRadius="10px" mb={4}>
          <Typography variant="h5" color={colors.primary[100]} mb={2}>
            Nutrition Details:
          </Typography>
          <ul>
            <li>Name: {foodDetails.itemName} </li>
            <li>Calories: {foodDetails.calories} kcal</li>
            <li>Protein: {foodDetails.protein} g</li>
            <li>Fat: {foodDetails.fat} g</li>
            <li>Carbs: {foodDetails.carbs} g</li>
            <li>Fiber: {foodDetails.fiber} g</li>
            <li>Sugar: {foodDetails.sugar} g</li>
          </ul>
        </Box>
      )}

      <Box textAlign="center">
        <Button
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
          Save
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
            Food Consumed and Digested Successfully!
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
            Okay
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default CalorieInfo;
