/** @format */

import {
  Box,
  Typography,
  useTheme,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { tokens } from "../../theme";
import {
  mockTransactions,
  mockDailyCalorie,
  mockExerciseRespList,
} from "../../data/mockData";
import { AccordionItem, Header } from "../../components";
import { ExpandMore } from "@mui/icons-material";

const ExerciseHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const renderExpandedFoodItem = (item, index) => {
    const {
      workout_name,
      workout_variation,
      total_calories,
      duration_minutes,
    } = item || {};

    return (
      <Box
        key={index}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width={"100%"}>
        <Typography color={colors.primary[100]} variant="body1">
          {workout_variation}
        </Typography>
        <Typography color={colors.primary[100]} variant="body1">
          {duration_minutes}
        </Typography>
      </Box>
    );
  };

  const renderFoodListItem = (item, index) => {
    const {
      workout_name,
      workout_variation,
      total_calories,
      duration_minutes,
      id,
    } = item || {};
    return (
      <Accordion disableGutters sx={{ bgcolor: `${colors.primary[400]}` }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box
            key={`${id}-${index}`}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width={"100%"}
            p="5px">
            <Box>
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600">
                {workout_name}
              </Typography>
            </Box>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}>
              <Box p="5px 10px" borderRadius="4px">
                {`${total_calories} cal`}
              </Box>
            </div>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {renderExpandedFoodItem(item, index)}
        </AccordionDetails>
      </Accordion>
    );
  };

  const renderFoodList = () => {
    return (
      <div
        style={{
          marginLeft: "10px",
          marginRight: "10px",
          borderRadius: "10px",
        }}
        className="exercise-list-container">
        <Box display="flex" alignItems="center" justifyContent="flex-start">
          <Header
            title="Workout Log"
            subtitle="Keep Your Fitness on Track..."
          />
        </Box>
        {mockExerciseRespList.map((item, index) =>
          renderFoodListItem(item, index)
        )}
      </div>
    );
  };

  return (
    <div style={{ marginTop: "10px" }} className="exercise-history">
      {renderFoodList()}
    </div>
  );
};

export default ExerciseHistory;
