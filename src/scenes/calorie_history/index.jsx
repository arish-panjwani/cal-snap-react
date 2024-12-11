/** @format */

import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { URLs } from "../../api/apiConstant";
import { APIRequest, getAnyCookie } from "../../api/helper";
import { Header } from "../../components";
import { tokens } from "../../theme";
import Loader from "../../components/Loader";
import { capitalizeFirstChar, formatDate } from "../../utils/helper";

const CalorieHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [foodData, setFoodData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFoodData = async () => {
      const userId = getAnyCookie("userId");
      if (!userId) {
        setError("User ID not found in cookies.");
        return;
      }

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
          setFoodData(result.data);
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

    fetchFoodData();
  }, []);

  const groupByDate = (data) => {
    return data.reduce((acc, curr) => {
      const { date } = curr;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(curr);
      return acc;
    }, {});
  };

  const groupedData = foodData.length ? groupByDate(foodData) : {};

  const renderExpandedFoodItem = (item) => {
    const details = {
      Weight: `${item.itemWeightConsumed}g`,
      Calories: `${item.caloriesConsumed} cal`,
      Carbs: `${item.carbs}g`,
      Protein: `${item.protein}g`,
      Fat: `${item.fat}g`,
      Sodium: `${item.sodium}g`,
      Cholesterol: `${item.cholesterol}g`,
    };

    return Object.entries(details).map(([key, value], index) => (
      <Box
        key={index}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width={"100%"}>
        <Typography color={colors.primary[100]} variant="body1">
          {key}
        </Typography>
        <Typography color={colors.primary[100]} variant="body1">
          {value}
        </Typography>
      </Box>
    ));
  };

  const renderFoodListItem = (item) => (
    <Accordion
      disableGutters
      sx={{ bgcolor: `${colors.primary[400]}` }}
      key={item.id}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width={"100%"}
          p="5px">
          <Typography
            color={colors.greenAccent[500]}
            variant="h5"
            fontWeight="600">
            {capitalizeFirstChar(item.itemName)}
          </Typography>
          <Typography color={colors.primary[200]} variant="body1">
            {item.time}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>{renderExpandedFoodItem(item)}</AccordionDetails>
    </Accordion>
  );

  const renderFoodList = () => (
    <div
      style={{
        marginLeft: "10px",
        marginRight: "10px",
        borderRadius: "10px",
      }}
      className="food-list-container">
      <Box display="flex" alignItems="center" justifyContent="flex-start">
        <Header
          title="Your Calorie Journal"
          subtitle="Know What You Consume..."
        />
      </Box>
      {Object.entries(groupedData).map(([date, items]) => (
        <Box key={date} marginBottom="20px">
          <Typography
            color={colors.primary[100]}
            variant="h6"
            marginBottom="10px">
            {formatDate(date)}
          </Typography>
          {items.map((item) => renderFoodListItem(item))}
        </Box>
      ))}
    </div>
  );

  if (error) {
    return (
      <Typography color="error" variant="h5">
        {error}
      </Typography>
    );
  }

  if (!isLoading && !foodData.length) {
    return (
      <Typography color={colors.primary[200]} variant="h5" textAlign="center">
        No data available.
      </Typography>
    );
  }

  return (
    <>
      {isLoading && <Loader color="secondary" type="linear" />}
      <div style={{ marginTop: "10px" }} className="calorie-history">
        {renderFoodList()}
      </div>
    </>
  );
};

export default CalorieHistory;
