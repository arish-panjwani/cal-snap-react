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
import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import { mockTransactions, mockDailyCalorie } from "../../data/mockData";
import { useMutation } from '@tanstack/react-query';
import { URLs } from "../../api/apiConstant";
import { getAnyCookie, APIRequest } from "../../api/helper";
import { mockPieData as pieData } from "../../data/mockData";

// const legendDatas = [
//   { id: '', label: '1925 & Under', color: '#66B2FF' },
//   { id: 'Medium', label: '1926-2425', color: '#66D97F' },
//   { id: 'High', label: '2426-3750', color: '#FFBF47' },
//   { id: 'Critical', label: '3750 & Over', color: '#F5727D' },
// ];

const legendDatas = [
    { id: '', label: 'Lose weight', color: '#66B2FF' },
    { id: 'Medium', label: 'Preferred weight', color: '#66D97F' },
    { id: 'High', label: 'Maintain weight', color: '#FFBF47' },
    { id: 'Critical', label: 'Gain weight', color: '#F5727D' },
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

function getColorByValue(value) {
  if (value > 75) {
    return { color: '#F5727D', label: 'Worse' };
  } else if (value > 50) {
    return { color: '#FFBF47', label: 'Moderate' };
  } else if (value > 25) {
    return { color: '#66B2FF', label: 'Fair' };
  } else {
    return { color: '#66D97F', label: 'Good' };
  }
}

function Dashboard() {
  const title = 'Hello ' + getAnyCookie("first_name")
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");
  const [isLoading, setLoading] = useState(false);
  const [calorieData, setCalorieData] = useState([]);
  const [healthRiskScoreData, setHealthRiskScoreData] = useState([]);
  const [dataForPieChart, setDataForPieChart] = useState([]);
  const [dataForLineChart, setDataForLineChart ] = useState([]);
  const [dataForGaugeChart, setDataForGaugeChart] = useState(0);
  const [dataForHealthGaugeChart, setDataForHealthGaugeChart] = useState(0);
  const [rangeTypeLine, setRangeTypeLine] = useState("lastWeek");
  const [rangeTypeGauge, setRangeTypeGauge] = useState("today");
  const [rangeTypePie, setRangeTypePie] = useState("lastWeek");
  const [rangeTypeHealthGauge, setRangeTypeHealthGauge] = useState("lastWeek");
  let lineChartData = [];
  let gaugeChartData = [];
  let healthGaugeChartData = [];
  let pieChartData = [];

  const legendData = legendDatas.map((item) => ({
    color: item.color,
    label: item.label,
  }));

  const legendHealthData = legendHealthDatas.map((item) => ({
    color: item.color,
    label: item.label,
  }));

  function getFilteredData(data, startDate, endDate) {
    return data.filter(entry => {
      const entryDate = new Date(entry.created);
      return entryDate >= startDate && entryDate <= endDate;
    });
  }

  function getFilteredHealthData(data, startDate, endDate) {
      const entryDate = new Date(data.created);
      if (entryDate >= startDate && entryDate <= endDate){
        return data;
      }
  }

  function groupDataByDate(data){
    const groupedData = data.reduce((acc, curr) => {
      const date = curr.date;
      if (!acc[date]) {
        acc[date] = {
          date: date,
          totalCalories: 0
        };
      }
      acc[date].totalCalories += curr.caloriesConsumed;
      return acc;
    }, {});
    
    return Object.values(groupedData);
  }

  function getTotalCaloriesConsumed (data) {
    return data.reduce((sum, entry) => sum + entry.caloriesConsumed, 0);
  }

  function getTotalMacroNutrients(data) {
    return data.reduce(
      (totals, entry) => {
        totals.carbs += parseFloat(entry.carbs) || 0;
        totals.fat += parseFloat(entry.fat) || 0;
        totals.protein += parseFloat(entry.protein) || 0;
        return totals;
      },
      { carbs: 0, fat: 0, protein: 0 } // Initial totals
    );
  }

  function getAverageHealthScore(healthData) {
    return healthData.healthScore;
  }

  function handleDateRangeChange(data, rangeType, chartType) {
    let startDate, endDate;
    const today = new Date();
  
    // Define date ranges
    switch (rangeType) {
      case "lastWeek":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        endDate = today;
        break;
      case "lastMonth":
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 1);
        endDate = today;
        break;
      case "today":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 1);
        endDate = today;
        break;
      default:
        throw new Error("Invalid range type");
    }
  
    // Filter data by date range
    let filteredData= [];
    let filteredHealthData= [];
    if (chartType == "healthGaugeChart"){
      filteredHealthData = getFilteredHealthData(data, startDate, endDate);
      console.log(filteredHealthData)
    }
    else {
      filteredData = getFilteredData(data, startDate, endDate);
    }
  
    switch (chartType) {
      case "lineChart":
        lineChartData = groupDataByDate(filteredData);
        console.log("Line Chart Data generated: ", lineChartData);
        setDataForLineChart(generateLineChartData(lineChartData, tokens("dark").redAccent[200]));
        break;
      case "gaugeChart":
        gaugeChartData = getTotalCaloriesConsumed(filteredData);
        console.log("Guage Chart Data generated: ", gaugeChartData);
        setDataForGaugeChart(gaugeChartData);
        break;
      case "pieChart":
        pieChartData = getTotalMacroNutrients(filteredData);
        console.log("Pie Chart Data generated: ", pieChartData);
        setDataForPieChart(generatePieChartData(pieChartData));
        break;
      case "healthGaugeChart":
        healthGaugeChartData = getAverageHealthScore(filteredHealthData);
        console.log("Health Guage Chart Data generated: ", healthGaugeChartData);
        setDataForHealthGaugeChart(healthGaugeChartData);
        break;
      default:
        throw new Error("Invalid chart type");
    }
  }

  function generatePieChartData(nutrients) {
    const colors = [
      "hsl(104, 70%, 50%)", // protein
      "hsl(162, 70%, 50%)", // fat
      "hsl(291, 70%, 50%)", // carbs
    ];
  
    const nutrientKeys = Object.keys(nutrients);
    return nutrientKeys.map((key, index) => ({
      id: key,
      label: key,
      value: parseFloat(nutrients[key].toFixed(2)),
      color: colors[index % colors.length], // Cycle through colors if there are more nutrients
    }));
  }

  function generateLineChartData(data, color) {
    // Ensure data is sorted by date
    const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
  
    // Map to the required format
    const chartData = sortedData.map((entry, index) => ({
      x: entry.date,
      y: entry.totalCalories,
    }));
  
    // Return the final structure
    return [
      {
        id: "calories",
        color: color, // Pass the color dynamically or use a default
        data: chartData,
      },
    ];
  }

  const handleRangeTypeChangeLine = (event) => {
    setRangeTypeLine(event.target.value); // Update the range type state
    handleDateRangeChange(calorieData, event.target.value, 'lineChart'); // Call the chart update function
  };

  const handleRangeTypeChangeGauge = (event) => {
    setRangeTypeGauge(event.target.value); // Update the range type state
    handleDateRangeChange(calorieData, event.target.value, 'gaugeChart'); // Call the chart update function
  };

  const handleRangeTypeChangePie = (event) => {
    setRangeTypePie(event.target.value); // Update the range type state
    handleDateRangeChange(calorieData, event.target.value, 'pieChart'); // Call the chart update function
  };

  const handleRangeTypeChangeHealthGauge = (event) => {
    setRangeTypeHealthGauge(event.target.value); // Update the range type state
    handleDateRangeChange(calorieData, event.target.value, 'healthGaugeChart'); // Call the chart update function
  };

  useEffect(() => {
    const userId = getAnyCookie("userId");
      if (!userId) {
        setError("User ID not found in cookies.");
        return;
      }

    const getCalorieData = async () => {
      try {
        setLoading(true);
        const result = await APIRequest(
          `${URLs.GET_FOOD_ITEM_NUTRIENTS.URL}${userId}`,
          URLs.GET_FOOD_ITEM_NUTRIENTS.METHOD
        );

        if (
          result &&
          result.statusCode === "200" &&
          Array.isArray(result.data)
        ) {
          setCalorieData(result.data);
          
          handleDateRangeChange(result.data, "today", "gaugeChart");
          handleDateRangeChange(result.data, "lastWeek", "lineChart");
          handleDateRangeChange(result.data, "lastWeek", "pieChart");
          setLoading(false);
        } else {
          setLoading(false);
          setError("Invalid API response format or no data available.");
        }
      } catch (apiError) {
        setLoading(false);
        console.error("Error fetching data:", apiError.message);
        setError("Failed to fetch calorie data. Please try again later.");
      }
    };

    const getHealthRiskScoreData = async () => {
      try {
        setLoading(true);
        const result = await APIRequest(
          // `${URLs.GET_HEALTH_RISK_SCORE.URL}${userId}`,
          `${URLs.GET_HEALTH_RISK_SCORE_BY_USER_ID.URL}${userId}`,
          URLs.GET_HEALTH_RISK_SCORE.METHOD
        );

        if (
          result &&
          result.statusCode === "200"
        ) {
          setHealthRiskScoreData(result.data);
          handleDateRangeChange(result.data, "lastWeek", "healthGaugeChart");
          setLoading(false);
        } else {
          setLoading(false);
          setError("Invalid API response format or no data available.");
        }
      } catch (apiError) {
        setLoading(false);
        console.error("Error fetching data:", apiError.message);
        setError("Failed to fetch calorie data. Please try again later.");
      }
    };

    getCalorieData();
    getHealthRiskScoreData();
  }, []);

  let weight = getAnyCookie("weight");
  let height = getAnyCookie("height");
  let age = getAnyCookie("age");
  let gender = getAnyCookie("gender").toLowerCase();
  let activityLevel = "moderately active";

  function calculateBMI(weight, height) {
    const heightInMt = height / 100; 
    const bmi = weight / (heightInMt * heightInMt);
    return bmi.toFixed(2);
  }

  function calculateBMR(weight, height, age, gender) {
    if (gender === "male") {
        return 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === "female") {
        return 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
        throw new Error("Invalid gender. Please specify 'male' or 'female'.");
    }
  }

  function calculateTDEE(bmr, activityLevel) {
    const activityFactors = {
        sedentary: 1.2,
        "lightly active": 1.375,
        "moderately active": 1.55,
        "very active": 1.725,
        "super active": 1.9
    };
 
    if (!activityFactors[activityLevel]) {
        throw new Error("Invalid activity level. Choose from sedentary, lightly active, moderately active, very active, or super active.");
    }
 
    return bmr * activityFactors[activityLevel];
  }

  function calculateCalorieRecommendations(tdee) {
    return {
        maintenance: tdee.toFixed(2),
        weightLoss: (tdee - 500).toFixed(2), // Reduce by 500 calories for weight loss
        weightGain: (tdee + 500).toFixed(2)  // Increase by 500 calories for weight gain
    };
  }
  
  let bmi = calculateBMI(weight, height);
  let bmr = calculateBMR(weight, height, age, gender);
  let tdee = calculateTDEE(bmr, activityLevel);
  let calorieRecommendation = calculateCalorieRecommendations(tdee);
  
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title={title} subtitle="Let's start eating healthy from now on" />
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
        gridAutoRows="160px"
        gap="5px"
      >
        <Box
          gridColumn={isXlDevices ? "span 3" : "span 3"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="5px"
        >
          <select value={rangeTypeGauge}
            onChange={handleRangeTypeChangeGauge}
            style={{ width: '150px' }} disabled>
              <option value="today">Today</option>
              <option value="lastWeek">Last Week</option>
              <option value="lastMonth">Last Month</option>
          </select>
      <div style={{ marginTop: 5 }}>
          <Typography variant="h5" fontWeight="550" textAlign="center">
            Calorie Consumption
          </Typography>
          </div>
          <GaugeChart
            value={dataForGaugeChart}  // Replace with actual dynamic value
            min={2000}
            max={6000}
            maintain={calorieRecommendation.maintenance}
            lose={calorieRecommendation.weightLoss}
            gain={calorieRecommendation.weightGain}
            user={2400}
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
          <Typography variant="h1" fontWeight="550" textAlign="center">
            {dataForGaugeChart}
          </Typography>
          <br/>
          <Typography variant="h6" fontWeight="400" textAlign="center" padding-left="100px">
            User Preference: 2400
          </Typography>
          <br/>
          <Typography variant="h6" fontWeight="400" textAlign="center" padding-left="100px">
            Based on BMI : {bmi}
          </Typography>
          <Typography variant="h6" fontWeight="400" textAlign="center" padding-left="100px">
            To maintain weight: {calorieRecommendation.maintenance}
          </Typography>
          <Typography variant="h6" fontWeight="400" textAlign="center" padding-left="100px">
            To lose weight: {calorieRecommendation.weightLoss}
          </Typography>
          <Typography variant="h6" fontWeight="400" textAlign="center" padding-left="100px">
            To gain weight: {calorieRecommendation.weightGain}
          </Typography>
          <br/>
          {/* <Typography variant="p" fontWeight="250" textAlign="center" padding-left="100px">
            *Calorie consumption threshold = 6000
          </Typography> */}
        </Box>
        <Box
          gridColumn={isXlDevices ? "span 3" : "span 3"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="5px"
        >
        <select 
        value={rangeTypeHealthGauge}
            onChange={handleRangeTypeChangeHealthGauge}
            style={{ width: '150px' }}>
              <option value="lastWeek">Last Week</option>
              <option value="lastMonth">Last Month</option>
          </select>
          <div style={{ marginTop: 5 }}>
          <Typography variant="h5" fontWeight="550" textAlign="center">
            Health Risk Score
          </Typography>
          </div>
          <HealthGaugeChart
            value={dataForHealthGaugeChart}  // Replace with actual dynamic value
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
            Health Risk Score (Summary)
          </Typography>
          <br/>
          <br/>
          <Typography variant="h1" fontWeight="550" textAlign="center">
            {dataForHealthGaugeChart}
          </Typography>
          <br/>
          <Typography variant="h5" fontWeight="500" textAlign="center">
            Score
          </Typography>
          <br/>
          <Box display="flex" 
                justifyContent="center" 
                alignItems="center" >
            <Box
                bgcolor={getColorByValue(dataForHealthGaugeChart).color}
                p="5px 10px"
                borderRadius="4px"
                width="60px"
                height="30px"
                textAlign="center"
                alignSelf="center"
              >
                {getColorByValue(dataForHealthGaugeChart).label}
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
          <select value={rangeTypeLine}
            onChange={handleRangeTypeChangeLine}
            style={{ width: '150px', height: '40px' }}>
              <option value="lastWeek">Last Week</option>
              <option value="lastMonth">Last Month</option>
          </select>
          <Typography variant="h5" fontWeight="550" textAlign="center">
            Calorie consumed {rangeTypeLine === 'lastWeek' ? ' (per week)' : ' (per month)'}
          </Typography>
          <Box height="280px" mt="-20px">
          {/* <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}> */}
            <LineChart data={dataForLineChart} />
          </Box>
        </Box>

        {/* Revenue Details */}
        <Box
          gridColumn={isXlDevices ? "span 4" : "span 3"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="10px"
        >
          <select value={rangeTypePie}
            onChange={handleRangeTypeChangePie}
            style={{ width: '150px' }}>
              <option value="lastWeek">Last Week</option>
              <option value="lastMonth">Last Month</option>
          </select>
          <Typography variant="h5" fontWeight="550" textAlign="center">
            Macronutrients Breakdown
          </Typography>
          <PieChart data={dataForPieChart}/>
        </Box>        
      </Box>
    </Box>
  );
}

export default Dashboard;
