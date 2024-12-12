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
  GeographyChart,
  PieChart,
  GaugeChart,
  HealthGaugeChart
} from "../../components";
import {
  DownloadOutlined,
  Email,
  Padding,
  PersonAdd,
  PointOfSale,
  Traffic,
} from "@mui/icons-material";
import { tokens } from "../../theme";
import { mockTransactions, mockDailyCalorie } from "../../data/mockData";
import { useMutation } from '@tanstack/react-query';
import { APIRequest } from '../../api/helper';
import { URLs } from "../../api/apiConstant";

const legendDatas = [
  { id: 'Low', label: '1925 & Under', color: '#66B2FF' },
  { id: 'Medium', label: '1926-2425', color: '#66D97F' },
  { id: 'High', label: '2426-3750', color: '#FFBF47' },
  { id: 'Critical', label: '3750 & Over', color: '#F5727D' },
];

const legendHealthDatas = [
  { id: 'Low', label: '0-25 (Good)', color: '#66D97F' },
  { id: 'Medium', label: '26-50 (Fair)', color: '#66B2FF' },
  { id: 'High', label: '51-75 (Moderate)', color: '#FFBF47' },
  { id: 'Critical', label: '76-100 (Worse)', color: '#F5727D' },
];
const CustomLegendItem = ({ color, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
    <div style={{ width: 15, height: 15, borderRadius: '50%', backgroundColor: color, marginRight: 5 }} />
    <span style={{ fontSize: 12 }}>{label}</span>
  </div>
);

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");

  const legendData = legendDatas.map((item) => ({
    color: item.color,
    label: item.label,
  }));

  const legendHealthData = legendHealthDatas.map((item) => ({
    color: item.color,
    label: item.label,
  }));

  const { mutate: getCalorieConsumptionData } = useMutation({
    mutationFn: async ({ userId, fromDate, toDate }) => {
        return APIRequest({ urlRequest: URLs.GET_CALORIE_CONSUMPTION, body: { userId, fromDate, toDate } });
      },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    }
  });
  // getCalorieConsumptionData("ada","asdad","adad");

  const { mutate: getHealthScoreData } = useMutation({
    mutationFn: async ({ userId, fromDate, toDate }) => {
        return APIRequest({ urlRequest: URLs.GET_HEALTH_SCORE, body: { userId, fromDate, toDate } });
      },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    }
  });
  // getHealthScoreData("ada","asdad","adad");

  const { mutate: getCalorieConsumptionDataForLineChart } = useMutation({
    mutationFn: async ({ userId, fromDate, toDate }) => {
        return APIRequest({ urlRequest: URLs.GET_CALORIE_CONSUMPTION_FOR_LINE_CHART, body: { userId, fromDate, toDate } });
      },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    }
  });
  // getCalorieConsumptionDataForLineChart("ada","asdad","adad");

  const { mutate: getMacroNutrientData } = useMutation({
    mutationFn: async ({ userId, fromDate, toDate }) => {
        return APIRequest({ urlRequest: URLs.GET_MACRO_NUTRIENT_DATA, body: { userId, fromDate, toDate } });
      },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    }
  });
  // getMacroNutrientData("ada","asdad","adad");

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="Hello, Sam" subtitle="Let's start eating healthy from now on" />
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
        gap="5px"
      >
        <Box
          gridColumn={isXlDevices ? "span 3" : "span 3"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="5px"
        >
          <select justifyContent="left">
        <option value="Last Week">Last Week</option>
        <option value="Last Month">Last Month</option>
      </select>
      <div style={{ marginTop: 5 }}>
          <Typography variant="h5" fontWeight="550" textAlign="center">
            Calorie Consumption
          </Typography>
          </div>
          <GaugeChart
            value={400}  // Replace with actual dynamic value
            min={1000}
            max={2000}
          />
          <div style={{ marginTop: -8, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {legendData.map((item, index) => (
          <CustomLegendItem key={index} {...item} />
        ))}
      </div>
        </Box>
        <Box
          gridColumn={isXlDevices ? "span 3" : "span 3"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="550" textAlign="center">
            Calorie Consumption (Summary)
          </Typography>
          <br/>
          <Typography variant="h2" fontWeight="550" textAlign="center">
            2000
          </Typography>

          <br/>
          <Typography variant="h6" fontWeight="400" textAlign="center" padding-left="100px">
            Based on BMI
          </Typography>
          <Typography variant="h6" fontWeight="400" textAlign="center" padding-left="100px">
            To lose weight: 1925
          </Typography>
          <Typography variant="h6" fontWeight="400" textAlign="center" padding-left="100px">
            To maintain weight: 2425
          </Typography>
          <br/>
          <Typography variant="p" fontWeight="250" textAlign="center" padding-left="100px">
            *Calorie consumption threshold = 6000
          </Typography>
        </Box>
        <Box
          gridColumn={isXlDevices ? "span 3" : "span 3"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="5px"
        >
           <select justifyContent="left">
        <option value="Last Week">Last Week</option>
        <option value="Last Month">Last Month</option>
      </select>
          <div style={{ marginTop: 5 }}>
          <Typography variant="h5" fontWeight="550" textAlign="center">
            Health Risk Score
          </Typography>
          </div>
          <HealthGaugeChart
            value={65}  // Replace with actual dynamic value
            min={0}
            max={100}
          />
          <div style={{ marginTop: -8, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {legendHealthData.map((item, index) => (
          <CustomLegendItem key={index} {...item} />
        ))}
      </div>
        </Box>
        <Box
          gridColumn={isXlDevices ? "span 3" : "span 3"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="550" textAlign="center">
            Health Score (Summary)
          </Typography>
          <br/>
          <Typography variant="h2" fontWeight="550" textAlign="center">
            60
          </Typography>
          <br/>
          <Typography variant="h6" fontWeight="500" textAlign="center">
            Score
          </Typography>
          <Box display="flex" 
                justifyContent="center" 
                alignItems="center" >
            <Box
                bgcolor="#66B2FF"
                p="5px 10px"
                borderRadius="4px"
                width="50px"
                textAlign="center"
                alignSelf="center"
              >
                Fair
              </Box>
          </Box>
          
        </Box>
        
        {/* Line Chart */}
        <Box
          gridColumn={
            isXlDevices ? "span 8" : isMdDevices ? "span 6" : "span 3"
          }
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          p="5px"
        >
          {/* <Box
            mt="25px"
            px="30px"
            display="flex"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.gray[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h5"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
          </Box> */}
          <select justifyContent="right">
        <option value="Last Week">Last Week</option>
        <option value="Last Month">Last Month</option>
      </select>
          <Typography variant="h5" fontWeight="550" textAlign="center">
            Calorie consumed (per week)
          </Typography>
          <Box height="300px" mt="-20px">
          {/* <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}> */}
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        {/* Revenue Details */}
        <Box
          gridColumn={isXlDevices ? "span 4" : "span 3"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="10px"
        >
          <select justifyContent="left">
        <option value="Last Week">Last Week</option>
        <option value="Last Month">Last Month</option>
      </select>
          <Typography variant="h5" fontWeight="550" textAlign="center">
            Macronutrients Breakdown
          </Typography>
          <PieChart />
        </Box>        
      </Box>
    </Box>
  );
}

export default Dashboard;
