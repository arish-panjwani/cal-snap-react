/** @format */

import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";

const ForgotChangePassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Validation function for the new password
  const validateNewPassword = (password) => {
    const lengthRequirement = password.length > 6;
    const capitalRequirement = /[A-Z]/.test(password);
    const smallRequirement = /[a-z]/.test(password);
    const specialCharRequirement = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      lengthRequirement &&
      capitalRequirement &&
      smallRequirement &&
      specialCharRequirement
    );
  };

  useEffect(() => {
    const currentUrl = window.location.href;

    console.info("currentUrl", currentUrl);
    if (currentUrl.includes("forgot-password")) {
      setIsForgotPasswordMode(true);
    } else {
      setIsForgotPasswordMode(false);
    }
  }, []);

  // Handler for new password input
  const handleNewPasswordChange = (value) => {
    setNewPassword(value);
    setIsPasswordValid(validateNewPassword(value));
  };

  // Submit handler
  const handleSubmit = () => {
    if (newPassword === confirmPassword) {
      setIsModalOpen(true);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    if (isForgotPasswordMode) {
      navigate("/login");
    } else {
      navigate("/settings");
    }
  };

  const colorForInputPlaceholder =
    theme.palette.mode === "dark" ? colors.primary[200] : colors.primary[800];

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
          {isForgotPasswordMode ? "Recover Password" : "Change Password"}
        </Typography>

        {/* Enter Current Password */}
        {!isForgotPasswordMode && (
          <TextField
            fullWidth
            type="password"
            label="Enter Current Password"
            variant="filled"
            margin="normal"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            InputLabelProps={{
              style: {
                color: colorForInputPlaceholder,
              },
            }}
          />
        )}

        {/* Enter New Password */}
        <TextField
          fullWidth
          type="password"
          label="Enter New Password"
          variant="filled"
          margin="normal"
          value={newPassword}
          color="info"
          onChange={(e) => handleNewPasswordChange(e.target.value)}
          error={!isPasswordValid && newPassword !== ""}
          helperText={
            !isPasswordValid && newPassword !== ""
              ? "Password must be at least 6 characters long, include one uppercase, one lowercase, and one special character."
              : ""
          }
          InputLabelProps={{
            style: {
              color: colorForInputPlaceholder,
            },
          }}
        />

        {/* Confirm New Password */}
        <TextField
          fullWidth
          type="password"
          label="Confirm New Password"
          variant="filled"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPassword !== newPassword && confirmPassword !== ""}
          helperText={
            confirmPassword !== newPassword && confirmPassword !== ""
              ? "Passwords do not match."
              : ""
          }
          InputLabelProps={{
            style: {
              color: colorForInputPlaceholder,
            },
          }}
        />

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            marginTop: "20px",
            paddingY: "10px",
            backgroundColor: colors.greenAccent[500],
            color: "black",
            "&:hover": {
              backgroundColor: colors.greenAccent[700],
            },
          }}
          disabled={
            (isForgotPasswordMode || currentPassword) &&
            isPasswordValid &&
            confirmPassword === newPassword
              ? false
              : true
          }
          onClick={handleSubmit}>
          Submit
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
            {`Password ${
              isForgotPasswordMode ? "Recovered" : "Changed"
            } Successfully`}
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

export default ForgotChangePassword;
