/** @format */

import { Card, CardContent, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";

const HealthProfileCard = ({
  bmi,
  tdee,
  bmr,
  calorieConsumed,
  calorieBurnt,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Card
      style={{
        maxWidth: 400,
        margin: "20px auto",
        padding: "5px",
        borderRadius: "16px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow effect
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 200, // Ensures vertical centering
      }}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          style={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "16px",
          }}>
          Health Profile
        </Typography>
        <Grid
          container
          spacing={3} // Adjust spacing between rows
          justifyContent="center"
          alignItems="center"
          style={{ textAlign: "center" }} // Center-align text
        >
          <Grid item xs={6}>
            <Typography
              variant="body2"
              color={colors.primary[200]}
              style={{ fontWeight: "bold" }}>
              Body Mass Index (BMI):
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color={colors.primary[200]}>
              {bmi}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="body2"
              color={colors.primary[200]}
              style={{ fontWeight: "bold" }}>
              Total Daily Energy Expenditure (TDEE):
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color={colors.primary[200]}>
              {tdee}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="body2"
              color={colors.primary[200]}
              style={{ fontWeight: "bold" }}>
              Basal Metabolic Rate (BMR):
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color={colors.primary[200]}>
              {bmr}
            </Typography>
          </Grid>

          {/* //TODO: Take the below data from API and total it */}
          {/* <Grid item xs={6}>
            <Typography
              variant="body2"
              color={colors.primary[200]}
              style={{ fontWeight: "bold" }}>
              Calories Consumed(daily Average):
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color={colors.primary[200]}>
              {calorieConsumed}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="body2"
              color={colors.primary[200]}
              style={{ fontWeight: "bold" }}>
              Calories Burnt(daily Average):
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color={colors.primary[200]}>
              {calorieBurnt}
            </Typography>
          </Grid> */}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HealthProfileCard;
