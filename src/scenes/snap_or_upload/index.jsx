/** @format */

import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { UploadFile, CameraAlt } from "@mui/icons-material";
import { tokens } from "../../theme";
import { Header } from "../../components";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { APIRequest } from "../../api/helper";
import { URLs } from "../../api/apiConstant";

function SnapUpload() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMdDevices = useMediaQuery("(min-width:724px)");

  const [selectedFile, setSelectedFile] = useState(null);
  const [cameraImage, setCameraImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [permissionModalOpen, setPermissionModalOpen] = useState(false); // Modal for denied permission
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const foodName = "apple";
  // const foodDetails = {
  //   calories: 300,
  //   protein: 15,
  //   fat: 10,
  //   carbs: 50,
  //   fiber: 5,
  //   sugar: 20,
  // };

  // Handle camera permission and capture image
  const handleSnapClick = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          const videoElement = document.createElement("video");
          videoElement.srcObject = stream;
          videoElement.play();

          setLoading(true);
          // Simulate capturing image after 3 seconds
          setTimeout(() => {
            const canvas = document.createElement("canvas");
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            const context = canvas.getContext("2d");
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

            const imageUrl = canvas.toDataURL("image/png");
            setCameraImage(imageUrl); // Save captured image
            stream.getTracks().forEach((track) => track.stop()); // Stop the camera

            setLoading(false);
            navigate("/preview-capture", { state: { imageUrl } }); // Navigate to preview page
          }, 3000);
        })
        .catch(() => {
          setCameraPermission(false);
          setPermissionModalOpen(true); // Show permission denied modal
        });
    }
  };

  const handleClosePermissionModal = () => {
    setPermissionModalOpen(false);
  };

  const handleFileChange = (event) => {
    console.info("handleFileChange");
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setSelectedFile(reader.result); // Save image URL
        var response = await APIRequest(
          URLs.GET_ITEM_NUTRIENT_BY_NAME.URL + foodName,
          URLs.GET_ITEM_NUTRIENT_BY_NAME.METHOD
        );
        const foodDetails = response.data[0];
        navigate("/calorie-info", {
          state: { image: reader.result, foodDetails },
        }); // Navigate to calorie info page
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBrowseClick = () => {
    console.info("handleBrowseClick");
    document.getElementById("fileInput").click();
  };

  return (
    <>
      {isLoading && <Loader color="secondary" type="linear" />}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="60vh"
        p="100px">
        <Box display="flex" alignItems="center" justifyContent="flex-start">
          <Header title="Snap or Upload your Food" />
        </Box>

        <Box
          display="flex"
          flexDirection={isMdDevices ? "row" : "column"}
          justifyContent={isMdDevices ? "space-around" : "center"}
          alignItems="center"
          width="100%"
          gap={isMdDevices ? 4 : 3}>
          {/* Snap Image Button */}
          <Box
            flex={1}
            textAlign="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
            bgcolor={colors.primary[400]}
            p={4}
            borderRadius="10px"
            boxShadow={3}>
            <CameraAlt sx={{ fontSize: 80, color: "#ccc" }} />
            <Button
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: colors.blueAccent[700],
                color: "#fcfcfc",
                fontSize: "16px",
                fontWeight: "bold",
                p: "12px 24px",
                transition: ".3s ease",
                ":hover": {
                  bgcolor: colors.blueAccent[800],
                },
              }}
              onClick={handleSnapClick}>
              Snap Image
            </Button>
          </Box>

          {/* OR */}
          {isMdDevices && (
            <Typography
              variant="h5"
              color={colors.gray[100]}
              fontWeight="bold"
              mx={4}>
              OR
            </Typography>
          )}

          {/* Browse Files Button */}
          <Box
            flex={1}
            textAlign="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
            bgcolor={colors.primary[400]}
            p={4}
            borderRadius="10px"
            boxShadow={3}>
            <UploadFile sx={{ fontSize: 80, color: "#ccc" }} />
            <Button
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: colors.blueAccent[700],
                color: "#fcfcfc",
                fontSize: "16px",
                fontWeight: "bold",
                p: "12px 24px",
                transition: ".3s ease",
                ":hover": {
                  bgcolor: colors.blueAccent[800],
                },
              }}
              onClick={handleBrowseClick}>
              Browse Files
            </Button>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*"
            />
          </Box>
        </Box>

        {/* Modal for Permission Denied */}
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
    </>
  );
}

export default SnapUpload;
