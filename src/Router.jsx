/** @format */

import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import App from "./App";

import { useAuth } from "./api/AuthContext";
import { getAnyCookie } from "./api/helper";
import {
  AboutUs,
  CalorieHistory,
  CalorieInfo,
  ChangeCaloriePreferences,
  Dashboard,
  Exercise,
  ExerciseHistory,
  ExerciseSummary,
  ForgotChangePassword,
  Login,
  MedicalProfile,
  PreviewCapture,
  Profile,
  SettingsPage as Settings,
  Signup,
  SnapUpload,
  UnderConstruction,
  UserProfile,
} from "./scenes";
import { debuggingMode } from "./utils/helper";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user } = useAuth(); // Get user state from AuthContext
  debuggingMode &&
    console.info("PrivateRoute user: ", user, getAnyCookie("userId"));
  return user || getAnyCookie("userId") ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" />
  ); // Redirect to login if not authenticated
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/profile-setup" element={<Profile />} />
        <Route path="/" element={<App />}>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={Dashboard} />}
          />
          <Route
            path="/log-exercise"
            element={<PrivateRoute element={Exercise} />}
          />
          <Route
            path="/snap-upload"
            element={<PrivateRoute element={SnapUpload} />}
          />
          <Route
            path="/calorie-info"
            element={<PrivateRoute element={CalorieInfo} />}
          />
          <Route
            path="/preview-capture"
            element={<PrivateRoute element={PreviewCapture} />}
          />
          <Route path="/about" element={<PrivateRoute element={AboutUs} />} />
          <Route
            path="/exercise-summary"
            element={<PrivateRoute element={ExerciseSummary} />}
          />
          <Route
            path="/search"
            element={<PrivateRoute element={UnderConstruction} />}
          />
          <Route
            path="/calorie-history"
            element={<PrivateRoute element={CalorieHistory} />}
          />
          <Route
            path="/exercise-history"
            element={<PrivateRoute element={ExerciseHistory} />}
          />
          <Route
            path="/disease-prediction"
            element={<PrivateRoute element={UnderConstruction} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={UserProfile} />}
          />
          <Route
            path="/health-profile"
            element={<PrivateRoute element={MedicalProfile} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/change-password" element={<ForgotChangePassword />} />
          <Route path="/forgot-password" element={<ForgotChangePassword />} />
          <Route
            path="/change-calorie-preferences"
            element={<ChangeCaloriePreferences />}
          />
          {/* <Route path="/team" element={<Team />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/form" element={<Form />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/stream" element={<Stream />} />
          <Route path="/line" element={<Line />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/geography" element={<Geography />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
