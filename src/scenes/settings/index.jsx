/** @format */

import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { LogoutOutlined } from "@mui/icons-material";
import { handleLogout } from "../../api/helper";

const SettingsPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleCalorieChange = () => {
    navigate("/change-calorie-preferences");
  };

  const handlePasswordChange = () => {
    navigate("/change-password");
  };

  const handleLogoutFunc = () => {
    handleLogout();
    navigate("/login");
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
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: colors.primary[100],
            marginBottom: 5,
            fontWeight: "bold",
          }}>
          Settings
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{
            marginBottom: "30px",
            paddingY: "10px",
            backgroundColor: colors.greenAccent[500],
            color: "black",
            "&:hover": {
              backgroundColor: colors.greenAccent[700],
              color: colors.primary[100],
            },
          }}
          onClick={handleCalorieChange}>
          Change Daily Calorie Preference
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{
            marginBottom: "30px",
            paddingY: "10px",
            backgroundColor: colors.greenAccent[500],
            color: "black",
            "&:hover": {
              backgroundColor: colors.greenAccent[700],
              color: colors.primary[100],
            },
          }}
          onClick={handlePasswordChange}>
          Change Password
        </Button>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: "20px", // Optional for spacing adjustment
          }}>
          <Button
            variant="contained"
            sx={{
              paddingY: "10px",
              paddingX: "20px",
              backgroundColor: colors.redAccent[500],
              color: "black",
              display: "flex",
              alignItems: "center",
              gap: "8px", // Adds space between text and logo
              "&:hover": {
                backgroundColor: colors.redAccent[700],
                color: colors.primary[100],
              },
            }}
            onClick={handleLogoutFunc}>
            <Typography variant="button" sx={{ fontWeight: "bold" }}>
              Logout
            </Typography>
            <LogoutOutlined />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsPage;
