/** @format */

import { Box, Typography, useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { URLs } from "../../api/apiConstant";
import { APIRequest, getAnyCookie } from "../../api/helper";
import { Header, HealthGaugeChart } from "../../components";
import Loader from "../../components/Loader";
import { tokens } from "../../theme";
import HealthProfileCard from "./HealthProfileCard";

const HealthScore = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState(null);
  const [healthScore, setHealthScore] = useState(undefined);
  const [isLoading, setLoading] = useState(false);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const userId = getAnyCookie("userId");
        if (!userId) {
          throw new Error("User ID not found in cookies.");
        }
        const resp = await APIRequest(
          `${URLs.GET_USERS.URL}${userId}`,
          URLs.GET_USERS.METHOD
        );
        if (resp.statusCode === "200") {
          setData(resp.data);
        } else {
          console.error("Failed to fetch data", resp.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch health score after initial data is fetched
  useEffect(() => {
    if (data) {
      const fetchHealthScore = async () => {
        try {
          setLoading(true);
          const userId = getAnyCookie("userId");
          if (!userId) {
            throw new Error("User ID not found in cookies.");
          }

          const {
            waist_circumference,
            hip_circumference,
            marital_status,
            family_size,
            family_income,
            alcohol_consumption,
            monthly_eatingout_spending,
            minutes_walk_bicycle,
            minutes_doing_recreational_activities,
            sleep_hours_weekdays,
            sleep_hours_weekend,
            no_of_cigarettes_perday,
            weight,
            height,
            bmi,
            age,
            gender,
          } = data;

          const payload = {
            Calories: 334,
            Weight: weight, // Assuming weight is part of the data
            Height: height, // Assuming height is part of the data
            BMI: bmi, // Assuming BMI is part of the data
            GenderStatus: gender, // Assuming gender status is hardcoded for now
            Age: age, // Assuming age is part of the data
            MaritalStatus: marital_status,
            Family_SizeStatus: String(family_size),
            Family_IncomeStatus: String(family_income),
            Alcohol_consumptionStatus: String(alcohol_consumption),
            Monthly_eatingout_spending: monthly_eatingout_spending,
            "Minutes_walk/bicycle": minutes_walk_bicycle,
            Minutes_doing_recreationalactivities:
              minutes_doing_recreational_activities,
            "Sleep hours_weekdays": sleep_hours_weekdays,
            Sleep_hours_weekend: sleep_hours_weekend,
            No_of_cigarettes_perday: no_of_cigarettes_perday,
          };

          payload["hip circumference"] = waist_circumference;
          payload["Waist circumference"] = hip_circumference;
          payload["Minutes_walk/bicycle"] = minutes_walk_bicycle;

          const finalPayload = { data: payload };

          const resp = await APIRequest(
            `${URLs.GET_HEALTH_SCORE.URL}`,
            URLs.GET_HEALTH_SCORE.METHOD,
            finalPayload
          );
          try {
            setHealthScore(String(resp.Health_risk_score));
          } catch (error) {}
        } catch (error) {
          console.error("Error fetching data:", error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchHealthScore();
    }
  }, [data]); // Dependency on data

  const renderHealthScore = useCallback(() => {
    return <HealthGaugeChart value={Number(healthScore)} min={0} max={100} />;
  }, [healthScore]);

  return (
    <>
      {isLoading && <Loader color="secondary" type="linear" />}
      <Box m="20px" display="flex" flexDirection="column">
        <Box display="flex" alignItems="center" justifyContent="flex-start">
          <Header
            title="HEALTH RISK SCORE"
            subtitle="Your Personalized Health Metrics at a Glance..."
          />
        </Box>
        {healthScore && (
          <>
            {renderHealthScore()}
            <Typography
              variant="h3"
              alignSelf={"center"}
              color={colors.primary[200]}>
              {"Your Score"}
            </Typography>
            <HealthProfileCard
              bmi={25}
              tdee={25}
              bmr={25}
              calorieConsumed={500}
              calorieBurnt={400}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default HealthScore;
