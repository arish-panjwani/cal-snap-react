/** @format */

// LoginForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dish1 from "../../src/assets/img/Dish1.jpg";
import dish2 from "../../src/assets/img/Dish2.jpg";
import dish3 from "../../src/assets/img/Dish3.jpg";
import dish4 from "../../src/assets/img/Dish4.jpeg";
import ImageSlider from "../components/ImageSlider";
import { colors } from "../res/colors";
import { strings } from "../res/strings";
import "../res/styles.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate input validation
    if (email && password) {
      // Redirect to dashboard
      navigate("/dashboard");
    }
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
        <span
          style={{
            color: isDarkTheme ? colors.dark.textColor : colors.light.textColor,
          }}>
          {isDarkTheme ? "Dark Mode" : "Light Mode"}
        </span>
      </div>
      <div className="image-section">
        {/* <img
          // src="https://via.placeholder.com/600x800" // Replace with your image URL
          src={login_img} // Replace with your image URL
          alt="Placeholder"
          className="image"
        /> */}
        <ImageSlider imgArr={[dish1, dish2, dish3, dish4]} />
      </div>
      <div
        className="form-section"
        style={{
          backgroundColor: isDarkTheme
            ? colors.dark.formBackground
            : colors.light.formBackground,
          color: isDarkTheme ? colors.dark.text : colors.light.text,
        }}>
        <div className="form-container">
          <div className="logo-container">
            <div
              className="logo"
              style={{
                color: isDarkTheme ? colors.dark.logo : colors.light.logo,
              }}>
              {strings.logoText}
            </div>
            <div className="slogan">{strings.slogan}</div>
          </div>
          <h2
            className="heading"
            style={{
              color: isDarkTheme
                ? colors.dark.textColor
                : colors.light.textColor,
            }}>
            {strings.heading}
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder={strings.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
              style={{
                backgroundColor: isDarkTheme
                  ? colors.dark.inputBackground
                  : colors.light.inputBackground,
                color: isDarkTheme ? colors.dark.text : colors.light.text,
                borderColor: isDarkTheme ? "#333" : "#ddd",
              }}
            />
            <input
              type="password"
              placeholder={strings.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
              style={{
                backgroundColor: isDarkTheme
                  ? colors.dark.inputBackground
                  : colors.light.inputBackground,
                color: isDarkTheme ? colors.dark.text : colors.light.text,
                borderColor: isDarkTheme ? "#333" : "#ddd",
              }}
            />
            <button
              type="submit"
              className="button"
              style={{
                backgroundColor: isDarkTheme
                  ? colors.dark.button
                  : colors.light.button,
              }}>
              {strings.buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
