/** @format */

import React from "react";
import {
  LinearProgress,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";

interface CircularProgressWithLabelProps {
  value: number;
}

const CircularProgressWithLabel: React.FC<CircularProgressWithLabelProps> = ({
  value,
}) => (
  <Box sx={{ position: "relative", display: "inline-flex" }}>
    <CircularProgress variant="determinate" value={value} />
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Typography variant="caption" component="div" color="text.secondary">
        {`${Math.round(value)}%`}
      </Typography>
    </Box>
  </Box>
);

interface LoaderProps {
  type: "linear" | "circular" | "circularWithLabel";
  value?: number; // Required for determinate or circularWithLabel
  size?: string | number;
  color?: "primary" | "secondary" | "success" | "inherit";
  variant?: "indeterminate" | "determinate";
}

const Loader: React.FC<LoaderProps> = ({
  type,
  value = 0,
  size = 40,
  color = "primary",
  variant = "indeterminate",
}) => {
  if (type === "linear") {
    return <LinearProgress color={color} />;
  }

  if (type === "circular") {
    if (variant === "determinate") {
      return <CircularProgress variant="determinate" value={value} />;
    }
    return <CircularProgress color={color} size={size} />;
  }

  if (type === "circularWithLabel") {
    return <CircularProgressWithLabel value={value} />;
  }

  return null; // Fallback for unsupported type
};

export default Loader;
