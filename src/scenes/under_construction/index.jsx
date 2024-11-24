/** @format */

import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import RobotImage from "../../assets/images/construction-robot.jpg"; // Import the image

const UnderConstruction = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const getFonts = () => {
    if (isNonMobile) {
      return {
        titleFont: "h3",
        bodyFont: "h5",
        imageSize: "350px",
      };
    } else {
      return {
        titleFont: "h5",
        bodyFont: "body1",
        imageSize: "200px",
      };
    }
  };

  const { titleFont, bodyFont, imageSize } = getFonts();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        bgcolor: "#f5f5f5",
        padding: 2,
      }}>
      {/* Image Section */}
      <img
        src={RobotImage}
        alt="Futuristic Robot for Construction"
        style={{
          width: imageSize,
          marginBottom: "20px",
          marginTop: "50px",
          borderRadius: "20px",
          opacity: 0.8,
        }}
      />

      {/* Text Section */}
      <Typography
        fontWeight="bold"
        variant={titleFont}
        sx={{ mb: 3, color: "#333" }}>
        Our Website is Under Construction!
      </Typography>
      <Typography
        variant={bodyFont}
        sx={{ mb: 2, color: "#555", maxWidth: "500px" }}>
        We're using the latest futuristic technologies to bring you something
        extraordinary...
      </Typography>
      <Typography
        variant={bodyFont}
        sx={{ mb: 0, color: "#555", maxWidth: "500px" }}>
        Stay Tuned for updates!
      </Typography>
    </Box>
    // <h1>hello world</h1>
  );
};

export default UnderConstruction;
