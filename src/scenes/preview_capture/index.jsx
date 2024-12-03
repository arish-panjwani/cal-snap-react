/** @format */

import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, Modal, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components";

function PreviewCapture() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(null);
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const foodDetails = {
    calories: 300,
    protein: 15,
    fat: 10,
    carbs: 50,
    fiber: 5,
    sugar: 20,
  };

  const checkPermissions = async () => {
    try {
      const permissionStatus = await navigator.permissions.query({
        name: "camera",
      });

      if (permissionStatus.state === "granted") {
        setHasPermission(true);
        startCamera();
      } else if (permissionStatus.state === "prompt") {
        requestCameraAccess();
      } else if (permissionStatus.state === "denied") {
        setHasPermission(false);
        setPermissionModalOpen(true);
      }

      permissionStatus.onchange = () => {
        if (permissionStatus.state === "granted") {
          setHasPermission(true);
          startCamera();
        } else {
          setHasPermission(false);
          setPermissionModalOpen(true);
        }
      };
    } catch (error) {
      console.error("Permission check failed:", error);
      setHasPermission(false);
      setPermissionModalOpen(true);
    }
  };

  const requestCameraAccess = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: { ideal: "environment" }, // Use "ideal" for fallback
        },
      })
      .then((stream) => {
        setHasPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch(() => {
        // Fallback to front camera if back camera is unavailable
        navigator.mediaDevices
          .getUserMedia({
            video: {
              facingMode: "user",
            },
          })
          .then((stream) => {
            setHasPermission(true);
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.play();
            }
          })
          .catch((err) => {
            console.error("Camera access failed:", err);
            setHasPermission(false);
            setPermissionModalOpen(true);
          });
      });
  };

  const startCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: { ideal: "environment" }, // Use "ideal" for fallback
          },
        })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch((err) => {
          console.error("Camera access failed:", err);
          setPermissionModalOpen(true);
        });
    }
  };

  useEffect(() => {
    checkPermissions();
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const handleClickImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const capturedImageUrl = canvas.toDataURL("image/png");
      setImageUrl(capturedImageUrl);
      stopCamera();
    }
  };

  const handleRetake = () => {
    setImageUrl(null);
    requestCameraAccess();
  };

  const handleProceed = () => {
    stopCamera();
    navigate("/calorie-info", { state: { image: imageUrl, foodDetails } });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleClosePermissionModal = () => {
    setPermissionModalOpen(false);
  };

  return (
    <Box p="20px">
      <Box display="flex" alignItems="center" justifyContent="center">
        <Header title="Capture your food" />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center">
        {!imageUrl && hasPermission && (
          <video
            ref={videoRef}
            style={{
              width: "100%",
              maxWidth: "600px",
              borderRadius: "10px",
              marginBottom: "20px",
              border: "5px solid #4BCEAC",
            }}></video>
        )}

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Captured"
            style={{
              width: "100%",
              maxWidth: "600px",
              borderRadius: "10px",
              marginBottom: "20px",
              border: "5px solid #4BCEAC",
            }}
          />
        )}

        <Box display="flex" gap="10px" justifyContent="center">
          {!imageUrl ? (
            <>
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
                onClick={handleClickImage}
                disabled={!hasPermission}>
                Click
              </Button>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="file-input"
                onChange={handleFileChange}
              />
            </>
          ) : (
            <>
              <Button
                variant="contained"
                sx={{
                  bgcolor: colors.blueAccent[500],
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "16px",
                  p: "10px 24px",
                  ":hover": {
                    bgcolor: colors.blueAccent[700],
                  },
                }}
                onClick={handleProceed}>
                Proceed
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: colors.redAccent[500],
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "16px",
                  p: "10px 24px",
                  ":hover": {
                    bgcolor: colors.redAccent[700],
                  },
                }}
                onClick={handleRetake}>
                Retake
              </Button>
            </>
          )}
        </Box>

        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </Box>

      <Modal open={permissionModalOpen} onClose={handleClosePermissionModal}>
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
            borderColor: colors.redAccent[500],
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
          }}>
          <Typography
            variant="h6"
            textAlign="center"
            color={colors.primary[100]}
            mb={3}>
            Permission Denied
          </Typography>
          <Typography variant="body1" color={colors.primary[100]} mb={2}>
            To allow camera access:
          </Typography>
          <ul style={{ color: colors.primary[100], marginLeft: "20px" }}>
            <li>Go to your browser's settings.</li>
            <li>Find the "Permissions" section.</li>
            <li>Allow camera access for this website.</li>
            <li>Reload the page.</li>
          </ul>
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: colors.redAccent[500],
              color: "black",
              fontWeight: "bold",
              p: "12px",
              ":hover": {
                bgcolor: colors.redAccent[700],
              },
            }}
            onClick={handleClosePermissionModal}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default PreviewCapture;
