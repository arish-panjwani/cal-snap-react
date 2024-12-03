/** @format */

import React, { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

function CapturePage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [cameraImage, setCameraImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);

  // Handle image capture from the camera
  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCameraImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Request camera permission
  const requestCameraPermission = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => setCameraPermission(true))
        .catch(() => setCameraPermission(false));
    }
  };

  return (
    <Box m="20px">
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 3, color: colors.primary[100] }}>
        Capture with Camera
      </Typography>
      <Box textAlign="center" p={4} backgroundColor={colors.primary[400]}>
        <Button
          onClick={requestCameraPermission}
          variant="contained"
          sx={{
            bgcolor: colors.blueAccent[700],
            color: "#fcfcfc",
            fontWeight: "bold",
            p: "10px 20px",
            mb: "18px",
            transition: ".3s ease",
            ":hover": {
              bgcolor: colors.blueAccent[800],
            },
          }}>
          Open Camera
        </Button>

        {/* Show error if permission is denied */}
        {cameraPermission === false && (
          <Typography color="red" mt={2}>
            Camera permission denied. Please allow access.
          </Typography>
        )}

        {/* Camera preview and take photo */}
        {cameraPermission === true && (
          <Box>
            <input
              type="file"
              accept="image/*"
              capture="camera"
              onChange={handleCapture}
              style={{ display: "none" }}
              id="cameraInput"
            />
            <Button
              onClick={() => document.getElementById("cameraInput").click()}
              variant="contained"
              sx={{
                bgcolor: colors.greenAccent[500],
                color: "#fcfcfc",
                fontWeight: "bold",
                p: "10px 20px",
                transition: ".3s ease",
                ":hover": {
                  bgcolor: colors.greenAccent[600],
                },
              }}>
              Capture Image
            </Button>
          </Box>
        )}

        {/* Image preview */}
        {cameraImage && (
          <Box mt={4}>
            <Typography color={colors.primary[100]} mb={2}>
              Captured Image:
            </Typography>
            <img
              src={cameraImage}
              alt="Captured"
              style={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: "10px",
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default CapturePage;
