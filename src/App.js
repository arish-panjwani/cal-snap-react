/** @format */

// App.js
import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/LoginForm";
import About from './pages/About'; 

const routeArr = [
  { Page: Dashboard, path: "/dashboard" },
  { Page: LoginForm, path: "/login" },
  { Page: About, path: "/about" },
];

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default Page */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Other Pages */}
        {routeArr.map((item, index) => {
          const { Page, path } = item || {};
          return <Route path={path} element={<Page />} />;
        })}
      </Routes>
    </Router>
  );
};

export default App;
