/** @format */

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Modal,
  useTheme,
} from "@mui/material";
import { Edit, Check } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";

const ChangeCaloriePreferences = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [calorieConsumptionTarget, setCalorieConsumptionTarget] =
    useState("2000");
  const [calorieBurntTarget, setCalorieBurntTarget] = useState("500");

  const [isConsumptionEditable, setIsConsumptionEditable] = useState(false);
  const [isBurntEditable, setIsBurntEditable] = useState(false);
  const [isPreferencesChanged, setIsPreferencesChanged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [originalConsumptionTarget, setOriginalConsumptionTarget] = useState(
    calorieConsumptionTarget
  );
  const [originalBurntTarget, setOriginalBurntTarget] =
    useState(calorieBurntTarget);

  // Handler to enable editing for consumption target
  const handleEditConsumption = () => {
    setIsConsumptionEditable(true);
  };

  // Handler to enable editing for burnt target
  const handleEditBurnt = () => {
    setIsBurntEditable(true);
  };

  // Save consumption target
  const handleSaveConsumption = () => {
    setIsConsumptionEditable(false);
    if (calorieConsumptionTarget !== originalConsumptionTarget) {
      setIsPreferencesChanged(true);
    }
  };

  // Save burnt target
  const handleSaveBurnt = () => {
    setIsBurntEditable(false);
    if (calorieBurntTarget !== originalBurntTarget) {
      setIsPreferencesChanged(true);
    }
  };

  // Save changes and open modal
  const handleSavePreferences = () => {
    setOriginalConsumptionTarget(calorieConsumptionTarget);
    setOriginalBurntTarget(calorieBurntTarget);
    setIsPreferencesChanged(false);
    setIsModalOpen(true);
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
            onChange={(e) => setCalorieConsumptionTarget(e.target.value)}
            InputProps={{
              readOnly: !isConsumptionEditable,
            }}
          />
          {isConsumptionEditable ? (
            <IconButton
              onClick={handleSaveConsumption}
              sx={{ color: colors.greenAccent[500], marginLeft: "10px" }}>
              <Check />
            </IconButton>
          ) : (
            <IconButton
              onClick={handleEditConsumption}
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
            onChange={(e) => setCalorieBurntTarget(e.target.value)}
            InputProps={{
              readOnly: !isBurntEditable,
            }}
          />
          {isBurntEditable ? (
            <IconButton
              onClick={handleSaveBurnt}
              sx={{ color: colors.greenAccent[500], marginLeft: "10px" }}>
              <Check />
            </IconButton>
          ) : (
            <IconButton
              onClick={handleEditBurnt}
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
          disabled={!isPreferencesChanged}
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
    </Box>
  );
};

export default ChangeCaloriePreferences;
