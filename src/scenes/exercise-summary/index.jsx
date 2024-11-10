import {
    Box,
    Button,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import {
    Header,
    StatBox,
    LineChart,
    ProgressCircle,
    BarChart,
    GeographyChart
    
  } from "../../components";
  import {
    DownloadOutlined,
    Email,
    PersonAdd,
    PointOfSale,
    Traffic,
  } from "@mui/icons-material";
  import { tokens } from "../../theme";
  import { mockTransactions, mockDailyCalorie } from "../../data/mockData";
import { ResponsiveBar } from "@nivo/bar";
  
  function ExerciseSummary() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isXlDevices = useMediaQuery("(min-width: 1260px)");
    const isMdDevices = useMediaQuery("(min-width: 724px)");
    const isXsDevices = useMediaQuery("(max-width: 436px)");
    return (
      <Box m="20px">
        <Box display="flex" justifyContent="space-between">
          <Header title="Exercise Summary"/>
        </Box>
  
        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns={
            isXlDevices
              ? "repeat(12, 1fr)"
              : isMdDevices
              ? "repeat(6, 1fr)"
              : "repeat(3, 1fr)"
          }
          gridAutoRows="140px"
          gap="20px"
        >
            {/* Statistic Items */}
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="450 Kcal"
            subtitle="Calories"
            progress="0.75"
            icon="🔥"
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1000 Steps"
            subtitle="Running"
            progress="0.50"
            icon="🏃"
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="82-90 BPM"
            subtitle="Heart Rate"
            progress="0.30"
            icon="❤️"
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1000 Score"
            subtitle="Sleep"
            progress="0.80"
            icon="🛌"
          />
        </Box>
          <Box
            gridColumn={
              isXlDevices ? "span 8" : isMdDevices ? "span 6" : "span 3"
            }
            gridRow="span 2"
            bgcolor={colors.primary[400]}
          >
            <Box height="300px" mt="-20px">
              <BarChart isDashboard={true} />
            </Box>
          </Box>
          <Box
            gridColumn={isXlDevices ? "span 4" : "span 3"}
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            p="30px"
            display="grid"
          >
            <Typography variant="h4" fontWeight="600" textAlign="center">
              Sam Fox
            </Typography>
            <Typography variant="h6" fontWeight="300" textAlign="center">
              Weight: 65 kg
            </Typography>
            <Typography variant="h6" fontWeight="300" textAlign="center">
              Height: 135 cm
            </Typography>
            <Typography variant="h6" fontWeight="300" textAlign="center">
              Age: 24
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }
  
  export default ExerciseSummary;
  