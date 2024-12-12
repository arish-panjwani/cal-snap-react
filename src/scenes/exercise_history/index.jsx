/** @format */

import { ExpandMore } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { getAnyCookie, UpdatedAPIRequest } from "../../api/helper";
import { Header } from "../../components";
import { tokens } from "../../theme";
import Loader from "../../components/Loader";
import { formatDate } from "../../utils/helper";

const ExerciseHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [exerciseData, setExerciseData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchExerciseData = async () => {
      setLoading(true);
      const userId = getAnyCookie("userId");
      if (!userId) {
        setError("User ID not found in cookies.");
        return;
      }

      try {
        const url = `${URLs.GET_EXERCISE_DATA.URL}${userId}`;
        console.info("41-->", url);
        const result = await UpdatedAPIRequest(
          url,
          URLs.GET_EXERCISE_DATA.METHOD
        );
        console.info("46-->", result);
        if (
          result &&
          result.statusCode === "200" &&
          Array.isArray(result.data)
        ) {
          setExerciseData(result.data);
        } else {
          setError("Invalid API response format or no data available.");
        }
      } catch (apiError) {
        console.error("Error fetching data:", apiError.message);
        setError("Failed to fetch exercise data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchExerciseData();
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

  const groupedData = exerciseData.length ? groupByDate(exerciseData) : {};

  const onPressDelete = async (itemId) => {
    console.log("Delete clicked", itemId);

    const result = await UpdatedAPIRequest(
      `${URLs.DELETE_EXERCISE.URL}/${itemId}`,
      URLs.DELETE_EXERCISE.METHOD
    );

    if (result.statusCode === "200") {
      // setModalOpen(true);
    } else {
      setError("Invalid API response format or no data available.");
    }
  };

  const renderExpandedExerciseItem = (item, itemId) => {
    const details = {
      Variation: item.exerciseVariation,
      "Calories Burned": `${item.calories_burned} cal`,
    };

    return (
      <>
        {Object.entries(details).map(([key, value], index) => (
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
        ))}
        <Box display="flex" justifyContent="flex-end" width="100%">
          <DeleteIcon
            onClick={() => onPressDelete(itemId)} // Pass the key if needed
            style={{ color: "red", cursor: "pointer", marginTop: "10px" }}
          />
        </Box>
      </>
    );
  };

  const renderExerciseListItem = (item) => (
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
            {item.exercise}
          </Typography>
          <Typography color={colors.primary[200]} variant="body1">
            {`${item.duration} mins`}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {renderExpandedExerciseItem(item, item.id)}
      </AccordionDetails>
    </Accordion>
  );

  const renderExerciseList = () => (
    <div
      style={{
        marginLeft: "10px",
        marginRight: "10px",
        borderRadius: "10px",
      }}
      className="exercise-list-container">
      <Box display="flex" alignItems="center" justifyContent="flex-start">
        <Header title="Workout Log" subtitle="Keep Your Fitness on Track..." />
      </Box>
      {Object.entries(groupedData).map(([date, items]) => (
        <Box key={date} marginBottom="20px">
          <Typography
            color={colors.primary[100]}
            variant="h6"
            marginBottom="10px">
            {formatDate(date)}
          </Typography>
          {items.map((item) => renderExerciseListItem(item))}
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

  if (!isLoading && !exerciseData.length) {
    return (
      <Typography color={colors.primary[200]} variant="h5" textAlign="center">
        No exercise data available.
      </Typography>
    );
  }

  return (
    <>
      {isLoading && <Loader color="secondary" type="linear" />}
      <div style={{ marginTop: "10px" }} className="exercise-history">
        {renderExerciseList()}
      </div>
    </>
  );
};

export default ExerciseHistory;
