/** @format */

import { Check, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URLs } from "../../api/apiConstant";
import { APIRequest, getAnyCookie } from "../../api/helper";
import Loader from "../../components/Loader";
import { tokens } from "../../theme";

const ChangeCaloriePreferences = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [calorieConsumptionTarget, setCalorieConsumptionTarget] = useState(0);
  const [calorieBurntTarget, setCalorieBurntTarget] = useState(0);
  const [isConsumptionEditable, setIsConsumptionEditable] = useState(false);
  const [isBurntEditable, setIsBurntEditable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // Fetch initial data on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const userId = getAnyCookie("userId");
        if (!userId) {
          throw new Error("User ID not found in cookies.");
        }

        const resp = await APIRequest(
          `${URLs.GET_USERS.URL}${userId}`,
          URLs.GET_USERS.METHOD
        );
        if (resp.statusCode === "200") {
          const { calBurnedTarget, calConsumptionsTarget } = resp.data;
          setUserData(resp.data);
          setCalorieBurntTarget(calBurnedTarget);
          setCalorieConsumptionTarget(calConsumptionsTarget);
          console.log("Data fetched successfully", resp.data);
        } else {
          console.error("Failed to fetch data", resp.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Handle save preferences
  const handleSavePreferences = async () => {
    try {
      const userId = getAnyCookie("userId");
      if (!userId) {
        throw new Error("User ID not found in cookies. Please log in again.");
      }

      // Validate inputs
      if (calorieBurntTarget <= 0 || calorieConsumptionTarget <= 0) {
        console.error("Targets must be positive numbers.");
        alert("Calorie targets must be positive numbers.");
        return;
      }

      // Prepare API payload
      const payload = {
        ...userData,
        id: userId,
        calBurnedTarget: calorieBurntTarget,
        calConsumptionsTarget: calorieConsumptionTarget,
      };

      // Ensure URL is formatted correctly
      const apiUrl = `${URLs.UPDATE_USER.URL}`;

      const resp = await APIRequest(apiUrl, URLs.UPDATE_USER.METHOD, payload);

      if (resp.statusCode === "200") {
        console.log("Preferences saved successfully", resp.data);
        setIsModalOpen(true); // Open modal on success
      } else {
        console.error("Failed to save preferences:", resp.message);
        alert(`Failed to save preferences: ${resp.message}`);
      }
    } catch (error) {
      console.error("Error saving preferences:", error.message);
      alert(`An error occurred while saving preferences: ${error.message}`);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/settings");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: colors.primary[500],
      }}>
      {!isLoading && (
        <>
          <Box
            sx={{
              width: "100%",
              maxWidth: 400,
              backgroundColor: colors.primary[400],
              borderRadius: 2,
              boxShadow: 3,
              padding: "20px",
            }}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ color: colors.primary[100], marginBottom: 3 }}>
              Change Calorie Preferences
            </Typography>

            {/* Calorie Consumption Target */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}>
              <TextField
                fullWidth
                type="number"
                label="Calorie Consumption Target"
                variant="outlined"
                value={calorieConsumptionTarget}
                onChange={(e) =>
                  setCalorieConsumptionTarget(Number(e.target.value))
                }
                InputProps={{
                  readOnly: !isConsumptionEditable,
                }}
              />
              {isConsumptionEditable ? (
                <IconButton
                  onClick={() => setIsConsumptionEditable(false)}
                  sx={{
                    color: colors.greenAccent[500],
                    marginLeft: "10px",
                  }}>
                  <Check />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => setIsConsumptionEditable(true)}
                  sx={{ color: colors.primary[100], marginLeft: "10px" }}>
                  <Edit />
                </IconButton>
              )}
            </Box>

            {/* Calorie Burnt Target */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}>
              <TextField
                fullWidth
                type="number"
                label="Calorie Burnt Target"
                variant="outlined"
                value={calorieBurntTarget}
                onChange={(e) => setCalorieBurntTarget(Number(e.target.value))}
                InputProps={{
                  readOnly: !isBurntEditable,
                }}
              />
              {isBurntEditable ? (
                <IconButton
                  onClick={() => setIsBurntEditable(false)}
                  sx={{
                    color: colors.greenAccent[500],
                    marginLeft: "10px",
                  }}>
                  <Check />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => setIsBurntEditable(true)}
                  sx={{ color: colors.primary[100], marginLeft: "10px" }}>
                  <Edit />
                </IconButton>
              )}
            </Box>

            {/* Save Button */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                paddingY: "10px",
                backgroundColor: colors.greenAccent[500],
                color: "black",
                "&:hover": {
                  backgroundColor: colors.greenAccent[700],
                },
              }}
              onClick={handleSavePreferences}>
              Save
            </Button>
          </Box>
          {/* Success Modal */}
          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 300,
                bgcolor: colors.primary[400],
                border: "2px solid",
                borderColor: colors.greenAccent[500],
                boxShadow: 24,
                borderRadius: 2,
                padding: 4,
              }}>
              <Typography
                variant="h6"
                align="center"
                sx={{ color: colors.primary[100], marginBottom: 2 }}>
                Preferences Saved Successfully
              </Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  color: "black",
                  "&:hover": {
                    backgroundColor: colors.greenAccent[700],
                  },
                }}
                onClick={handleCloseModal}>
                Close
              </Button>
            </Box>
          </Modal>
        </>
      )}
      {isLoading && (
        <Loader
          style={{
            display: "flex",
            flex: 1,
          }}
          color="secondary"
          type="circular"
        />
      )}
    </Box>
  );
};

export default ChangeCaloriePreferences;
