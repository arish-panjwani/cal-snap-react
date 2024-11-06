/** @format */

import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/LoginForm";
import ExercisePage from "./exercise/index";
import ExerciseDashboard from "./exercise-dashboard/index";

// Importing the CSS for global styles (the one with the sidebar and layout styles)
import "./App.css"; 

const routeArr = [
  { Page: Dashboard, path: "/dashboard" },
  { Page: LoginForm, path: "/login" },
  { Page: ExercisePage, path: "/exercise" },
  { Page: ExerciseDashboard, path: "/exercise-dashboard" },
];

const App = () => {
  return (
    <Router>
      <div className="app-container">  {/* Main container with flexbox layout */}
        

        {/* Main Content */}
        <div className="content-container">
          <Routes>
            {/* Default Page */}
            <Route path="/" element={<Navigate to="/login" />} />
            {/* Other Pages */}
            {routeArr.map((item, index) => {
              const { Page, path } = item || {};
              return <Route key={index} path={path} element={<Page />} />;
            })}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
