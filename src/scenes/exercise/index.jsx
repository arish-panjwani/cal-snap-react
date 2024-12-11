/** @format */

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  FaBicycle,
  FaDumbbell,
  FaRunning,
  FaSwimmer,
  FaYinYang,
} from "react-icons/fa";
import {
  EXERCISE_CALORIE_API_KEY_1,
  EXERCISE_CALORIE_URL,
  URLs,
} from "../../api/apiConstant";
import { APIRequest, getAnyCookie } from "../../api/helper";
import { Header } from "../../components";
import Loader from "../../components/Loader";
import { tokens } from "../../theme";
import {
  cyclingArr,
  durationArr,
  runningArr,
  swimmingArr,
  walkingArr,
  weightLiftingArr,
  yogaArr,
} from "./exerciseList";
import "./styles.css";

const initialValues = {
  exerciseType: "",
  exerciseSubType: "",
  duration: "",
  date: "",
};

const Exercise = () => {
  const [calorieData, setCalorieData] = useState([]);
  const [selectedExercise, setExercise] = useState("");
  const [selectedSubExercise, setSubExercise] = useState("");
  const [subExerciseArr, setSubExerciseArr] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const weight = getAnyCookie("weight");

  const exerciseArr = [
    { name: "Running", icon: <FaRunning /> },
    { name: "Walking", icon: <FaYinYang /> },
    { name: "Cycling", icon: <FaBicycle /> },
    { name: "Swimming", icon: <FaSwimmer /> },
    { name: "Yoga", icon: <FaYinYang /> },
    { name: "Weight Lifting", icon: <FaDumbbell /> },
  ];

  const getCalorieData = (exercise) => {
    let finalItem = "";
    exercise &&
      exercise.forEach((item) => {
        if (item.name.includes(selectedSubExercise)) {
          finalItem = item;
        }
      });

    return finalItem;
  };

  const onClearForm = (actions) => {
    actions.resetForm({ values: initialValues });
    setExercise("");
    setSubExercise("");
    setSubExerciseArr([]);
    setCalorieData([]);
  };

  const getSummaryFonts = () => {
    if (isNonMobile) {
      return {
        titleFont: "h3",
        bodyFont: "h5",
        footerFont: "h4",
      };
    } else {
      return {
        titleFont: "h5",
        bodyFont: "body1",
        footerFont: "h6",
      };
    }
  };

  const renderExerciseSummary = () => {
    const { total_calories, duration_minutes } = calorieData || {};
    const { titleFont, bodyFont, footerFont } = getSummaryFonts();

    return (
      <Card
        sx={{
          maxWidth: 400,
          margin: "20px auto",
          borderRadius: 2,
          backgroundColor: colors.primary[400],
          boxShadow: `0px 4px 6px ${colors.gray[700]}`,
          color: colors.primary.white,
        }}>
        <CardContent>
          {/* Header */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
            sx={{ paddingBottom: 0 }}>
            <Avatar
              sx={{
                bgcolor: colors.greenAccent[500],
                width: 56,
                height: 56,
              }}>
              <FitnessCenterIcon
                fontSize="large"
                style={{ color: colors.primary.black }}
              />
            </Avatar>
            <Typography
              variant={titleFont}
              fontWeight="bold"
              gutterBottom
              sx={{
                color: colors.primary.white,
              }}>
              Exercise Summary
            </Typography>
          </Box>
          <Divider
            sx={{
              marginBottom: 2,
              backgroundColor: colors.gray[200],
            }}
          />

          {/* Details */}
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            sx={{ marginBottom: 2 }}>
            <Typography
              variant={bodyFont}
              textAlign="center"
              sx={{
                color: colors.primary.white,
              }}>
              <strong>Workout Name:</strong> {selectedExercise || "N/A"}
            </Typography>
            <Typography
              variant={bodyFont}
              textAlign="center"
              sx={{
                color: colors.primary.white,
              }}>
              <strong>Variation:</strong> {selectedSubExercise || "N/A"}
            </Typography>
            <Typography
              variant={bodyFont}
              textAlign="center"
              sx={{
                color: colors.primary.white,
              }}>
              <strong>Workout Duration:</strong> {duration_minutes || 0} minutes
            </Typography>
            <Typography
              variant={footerFont}
              textAlign="center"
              fontWeight="bold"
              sx={{
                mt: 1,
                color: colors.greenAccent[500],
              }}>
              <strong>Total Calories Burnt:</strong> {total_calories || 0} kcal
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const renderExerciseEntryForm = (
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  ) => {
    return (
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap="16px">
          <FormControl fullWidth>
            <InputLabel>Exercise Type</InputLabel>
            <Select
              value={values.exerciseType}
              onChange={(e) => {
                handleChange(e);
                setExercise(e.target.value);
              }}
              onBlur={handleBlur}
              name="exerciseType"
              label="Exercise Type"
              error={touched.exerciseType && Boolean(errors.exerciseType)}>
              {exerciseArr.map((exercise, index) => (
                <MenuItem key={index} value={exercise.name}>
                  {exercise.name} {exercise.icon}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {subExerciseArr?.length > 0 && (
            <FormControl fullWidth>
              <InputLabel>Variation</InputLabel>
              <Select
                value={values.exerciseSubType}
                onChange={(e) => {
                  handleChange(e);
                  setSubExercise(e.target.value);
                }}
                onBlur={handleBlur}
                name="exerciseSubType"
                label="Variation"
                error={touched.exerciseType && Boolean(errors.exerciseType)}>
                {subExerciseArr.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <FormControl fullWidth>
            <InputLabel>Duration (in mins)</InputLabel>
            <Select
              value={values.duration}
              onChange={handleChange}
              onBlur={handleBlur}
              name="duration"
              label="Duration (in mins)"
              error={touched.duration && Boolean(errors.duration)}>
              {durationArr.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            variant="filled"
            type="date"
            label="Date"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.date}
            name="date"
            error={touched.date && Boolean(errors.date)}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box display="flex" justifyContent="center" mt={4}>
          <Button type="submit" color="secondary" variant="contained">
            Log Exercise
          </Button>
        </Box>
      </form>
    );
  };

  const sendCalorieData = async (payload) => {
    console.info("Data to be sent:", payload);
    const resp = await APIRequest(
      URLs.SEND_EXERCISE_ENTRY.URL,
      URLs.SEND_EXERCISE_ENTRY.METHOD,
      payload
    );
    if (resp.statusCode === "200") {
      console.log("Data sent successfully");
    } else {
      console.error("Failed to send data");
    }
  };

  const handleSubmit = async (values, actions) => {
    if (Object.keys(calorieData)?.length === 0) {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append("activity", values.exerciseType);
        if (values.duration) params.append("duration", values.duration);
        params.append("weight", weight);

        const generated_url = `${EXERCISE_CALORIE_URL}caloriesburned?${params.toString()}`;
        const response = await fetch(generated_url, {
          headers: {
            "X-Api-Key": EXERCISE_CALORIE_API_KEY_1,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const finalExerciseData = getCalorieData(data);

        const payload = {
          exercise: values.exerciseType,
          date: values.date,
          duration: values.duration,
          calories_burned: finalExerciseData.total_calories,
          userId: getAnyCookie("userId"),
          exerciseVariation: values.exerciseSubType,
        };

        await sendCalorieData(payload);
        setCalorieData(finalExerciseData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    } else if (Object.keys(calorieData)?.length > 0) {
      onClearForm(actions);
    }
  };

  useEffect(() => {
    switch (selectedExercise) {
      case "Running":
        setSubExerciseArr(runningArr);
        break;
      case "Walking":
        setSubExerciseArr(walkingArr);
        break;
      case "Cycling":
        setSubExerciseArr(cyclingArr);
        break;
      case "Swimming":
        setSubExerciseArr(swimmingArr);
        break;
      case "Yoga":
        setSubExerciseArr(yogaArr);
        break;
      case "Weight Lifting":
        setSubExerciseArr(weightLiftingArr);
        break;
      default:
        setSubExerciseArr([]);
        break;
    }
  }, [selectedExercise]);

  return (
    <>
      {isLoading && <Loader color="secondary" type="linear" />}
      <Box m="20px" display="flex" flexDirection="column">
        <Box display="flex" alignItems="center" justifyContent="flex-start">
          <Header
            title="LOG EXERCISE"
            subtitle="Track your exercise activity"
          />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box sx={{ width: "100%", maxWidth: "600px", p: 2, borderRadius: 2 }}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <>
                  {Object.keys(calorieData)?.length > 0 &&
                    renderExerciseSummary()}

                  {Object.keys(calorieData)?.length === 0 &&
                    renderExerciseEntryForm(
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit
                    )}
                </>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Exercise;
