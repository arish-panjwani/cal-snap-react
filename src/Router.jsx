import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import App from "./App";


import {
  Dashboard,
  Login,
  Exercise,
  Upload,
  AboutUs,
  ExerciseSummary,
  Signup,
  Invoices,
  Contacts,
  Form,
  Bar,
  Line,
  Pie,
  FAQ,
  Geography,
  Calendar,
  Stream,
  Profile
} from "./scenes";
import { useAuth } from "./api/AuthContext";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user } = useAuth(); // Get user state from AuthContext

  return user ? <Component {...rest} /> : <Navigate to="/login" />; // Redirect to login if not authenticated
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>

        <Route path="/profilesetup" element={<Profile />} />

        <Route path="/" element={<App />}>
          <Route path="/" element={<PrivateRoute element={Dashboard} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/exercise" element={<PrivateRoute element={Exercise} />} />
          <Route path="/upload" element={<PrivateRoute element={Upload} />} />
          <Route path="/about" element={<PrivateRoute element={AboutUs} />} />
          <Route path="/exercise-summary" element={<PrivateRoute element={ExerciseSummary} />} />
          <Route path="/signup" element={<Signup />} />
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
