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
import { mockFoodConsumedList } from "../../data/mockData";
import { tokens } from "../../theme";
import { Header } from "../../components";

const CalorieHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const renderExpandedFoodItem = (item, index) => {
    const { details } = item || {};
    const detailList = Object?.entries(details);

    return detailList.map((item, index) => {
      const componentName = item[0];
      const componentValue = item[1];
      return (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width={"100%"}>
          <Typography color={colors.primary[100]} variant="body1">
            {componentName}
          </Typography>
          <Typography color={colors.primary[100]} variant="body1">
            {componentValue}
          </Typography>
        </Box>
      );
    });
  };

  const renderFoodListItem = (transaction, index) => {
    return (
      <Accordion disableGutters sx={{ bgcolor: `${colors.primary[400]}` }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box
            key={`${transaction.id}-${index}`}
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
                {transaction.itemName}
              </Typography>
            </Box>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}>
              <Box p="5px 10px" borderRadius="4px">
                {`${transaction.calorieIntake} cal`}
              </Box>
            </div>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {renderExpandedFoodItem(transaction, index)}
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
        className="food-list-container">
        <Box display="flex" alignItems="center" justifyContent="flex-start">
          <Header
            title="Your Calorie Journal"
            subtitle="Know What You Consume..."
          />
        </Box>
        {mockFoodConsumedList.map((item, index) =>
          renderFoodListItem(item, index)
        )}
      </div>
    );
  };

  return (
    <div style={{ marginTop: "10px" }} className="calorie-history">
      {renderFoodList()}
    </div>
  );
};

export default CalorieHistory;
