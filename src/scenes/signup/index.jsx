/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import login_page_img from "../../assets/images/login_page_img.png";
import logo_img from "../../assets/images/logo.png";
import { strings } from "../../res/strings";
import "../../scenes/login/styles.css";

function Signup() {
  const [user, setUser] = useState({
    // DUMMY DATA FOR TESTING
    // firstName: "Arish",
    // lastName: "Panjwani",
    // email: "panjwaniarish@gmail.com ",
    // mobileNumber: "1234567890",
    // dob: "2001-01-01",
    // password: "pass",
    // confirmPassword: "pass",
    // firstName: "",
    // lastName: "",
    // email: "",
    // mobileNumber: "",
    // dob: "",
    // password: "",
    // confirmPassword: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log("User data submitted:", user);
    if (user.password === user.confirmPassword) {
      // Pass the user data to ProfileSetup page as profile_data
      navigate("/profile-setup", {
        state: { profile_data: user },
      });
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-image">
          <img src={login_page_img} alt="Calorie Tracking App" />
        </div>
        <div className="login-form-box">
          <div className="form-container">
            <div className="logo-container">
              <img src={logo_img} alt="Calsnap Logo" className="logo" />
            </div>
            <h2>{strings.heading}</h2>
            <p>{strings.subHeading}</p>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-field">
                <label htmlFor="first_name">{strings.firstNameLabel}</label>
                <input
                  type="text"
                  id="first_name"
                  name="firstName"
                  placeholder={strings.firstNamePlaceHolder}
                  value={user.firstName}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="last_name">{strings.lastNameLabel}</label>
                <input
                  type="text"
                  id="last_name"
                  name="lastName"
                  placeholder={strings.lastNamePlaceHolder}
                  value={user.lastName}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="dateOfBirth">{strings.dateOfBirthLabel}</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  placeholder={strings.dateOfBirthPlaceHolder}
                  value={user.dob}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="email">{strings.emailLabel}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={strings.emailPlaceholder}
                  value={user.email}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="mobileNumber">{strings.mobileLabel}</label>
                <input
                  type="number"
                  id="mobileNumber"
                  name="mobileNumber"
                  placeholder={strings.mobilePlaceholder}
                  value={user.mobileNumber}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="password">{strings.passwordLabel}</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder={strings.passwordPlaceholder}
                  value={user.password}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="confirmPassword">
                  {strings.confirmPasswordLabel}
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder={strings.confirmPasswordPlaceholder}
                  value={user.confirmPassword}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <button type="submit" className="login-button">
                Signup
              </button>
            </form>
            <p className="signup-link">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
