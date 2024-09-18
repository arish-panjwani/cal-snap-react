/** @format */

// Dashboard.js
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // Import logout icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../res/colors";
import { strings } from "../res/strings";
import "../res/styles.css";

const Dashboard = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout operation (if any)
    navigate("/login");
  };

  return (
    <div
      className="container"
      style={{
        background: isDarkTheme
          ? `linear-gradient(135deg, ${colors.dark.background}, ${colors.dark.button})`
          : `linear-gradient(135deg, ${colors.light.background}, ${colors.light.button})`,
      }}>
      <div className="theme-switcher">
        <label className="switch">
          <input
            type="checkbox"
            checked={!isDarkTheme}
            onChange={() => setIsDarkTheme(!isDarkTheme)}
          />
          <span className="slider round"></span>
        </label>
        <span>{isDarkTheme ? "Dark Mode" : "Light Mode"}</span>
      </div>

      <div
        className="dashboard-section"
        style={{
          backgroundColor: isDarkTheme
            ? colors.dark.formBackground
            : colors.light.formBackground,
          color: isDarkTheme ? colors.dark.text : colors.light.text,
        }}>
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div
              className="logo"
              style={{
                color: isDarkTheme ? colors.dark.logo : colors.light.logo,
              }}>
              {strings.dashboardLogoText}
            </div>
            <h1 className="heading" style={{ marginTop: "10px" }}>
              {strings.dashboardHeading}
            </h1>
          </div>

          <div className="dashboard-content">
            <div className="card" style={{ marginBottom: "20px" }}>
              <h2 className="card-title">Section 1</h2>
              <p className="card-description">
                This is a brief description of the first section.
              </p>
            </div>

            <div className="card" style={{ marginBottom: "20px" }}>
              <h2 className="card-title">Section 2</h2>
              <p className="card-description">
                Details of the second section can go here.
              </p>
            </div>

            <div className="card" style={{ marginBottom: "20px" }}>
              <h2 className="card-title">Section 3</h2>
              <p className="card-description">
                Information about the third section can go here.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Small Logout button placed at the bottom */}
      <button
        className="logout-button" // Apply only the logout-button class
        style={{
          backgroundColor: isDarkTheme
            ? colors.dark.button
            : colors.light.button,
          position: "fixed", // Fix position to bottom
          bottom: "20px", // Space from the bottom
          left: "50%", // Center horizontally
          transform: "translateX(-50%)", // Adjust to be fully centered
          fontSize: "14px", // Ensure smaller font size
          borderRadius: "5px", // Rounded corners
          padding: "6px 12px", // Small button size
          display: "flex", // Flexbox to align icon and text
          alignItems: "center",
          justifyContent: "center", // Center the text/icon
          cursor: "pointer", // Pointer cursor on hover
        }}
        onClick={handleLogout}>
        <FontAwesomeIcon
          icon={faSignOutAlt}
          style={{ marginRight: "8px" }} // Space between icon and text
        />
        {strings.LOGOUT}
      </button>
    </div>
  );
};

export default Dashboard;
