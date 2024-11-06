import {
    Box,
    Button,
    Typography,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import { UploadFile } from "@mui/icons-material";
  import { tokens } from "../../theme";
  import { mockTransactions } from "../../data/mockData";
  import { useState } from 'react';
  import { Header } from "../../components";
  
  function Upload() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const isNonMobile = useMediaQuery("(min-width:600px)");
    
    const isXlDevices = useMediaQuery("(min-width: 1260px)");
    const isMdDevices = useMediaQuery("(min-width: 724px)");
    const isXsDevices = useMediaQuery("(max-width: 436px)");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setSelectedFile(file);
          console.log("File selected:", file);
          // Here you can handle the file upload logic, e.g., sending it to a server
        }
      };
    
      const handleButtonClick = () => {
        document.getElementById('fileInput').click();
      };

    return (
      <Box m="20px">
      <Header title="UPLOAD" subtitle="Upload picture to figure out calorie" />
        <Box display="grid" gridColumn={
            isXlDevices ? "span 8" : isMdDevices ? "span 4" : "span 2"
          }>
        <Box display="flex" justifyContent="center" p={4} backgroundColor={colors.primary[400]}>
        <Box width="50%" textAlign="center" border="2px dashed #ccc" borderRadius="10px" p={4}>
            <Typography variant="h3" gutterBottom color={colors.greenAccent[600]} fontWeight="600">
                Upload File
            </Typography>
            <Box p={4} display="flex" flexDirection="column" alignItems="center">
                <UploadFile sx={{ fontSize: 60, color: '#ccc' }} />
                    <Typography variant="body1" color={colors.gray[100]}>
                    Drag and drop here
                    </Typography>
                    <Typography variant="body1" color={colors.gray[100]} mb={2}>
                    - OR -
                    </Typography>
                <Button 
                    variant="contained"
                    sx={{
                      bgcolor: colors.blueAccent[700],
                      color: "#fcfcfc",
                      fontSize: isMdDevices ? "14px" : "10px",
                      fontWeight: "bold",
                      p: "10px 20px",
                      mt: "18px",
                      transition: ".3s ease",
                      ":hover": {
                        bgcolor: colors.blueAccent[800],
                      },
                    }}
                    onClick={handleButtonClick}>
                    Browse Files
                </Button>
            </Box>
            {selectedFile && (
          <Typography variant="body1" mt={2}>
            Selected File: {selectedFile.name}
          </Typography>
            )}
        </Box>
      </Box>
      </Box>
      </Box>
    );
  }
  
  export default Upload;
  