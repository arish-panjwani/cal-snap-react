import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../res/colors";
import { strings } from "../res/strings";
import "../res/styles.css";
import { URLs } from "../api/apiConstant";
import { APIRequest } from "../api/helper";
import { useMutation } from "@tanstack/react-query";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const navigate = useNavigate();

//   const { mutate, isLoading, error: loginError } = useMutation({
//     mutationFn: APIRequest,
//     onSuccess: (data) => {
//       // Success actions
//       console.log(data);
//       navigate("/dashboard");
//     },
//     onError: (error) => {
//       // Error actions
//       console.error(error);
//     },
//   });

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const body = { username: email, password };
//     mutate({ urlRequest: URLs.GET_USER});
//   };
  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="logo">
          <img src="/logo.png" alt="Calsnap Logo" />
        </div>
        <h2>Sign Up!</h2>
        <p>Enter your details below to create your account and get started.</p>
        <form className="signup-form">
          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Full Name" />
          </div>
          <div className="input-field">
            <label htmlFor="contact">Contact</label>
            <input type="text" id="contact" placeholder="Contact Number" />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email" />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="6+ Characters | 1 Capital letter" />
          </div>
          <div className="input-field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" placeholder="Confirm Password" />
          </div>
          <div className="input-field">
            <label htmlFor="gender">Gender</label>
            <select id="gender">
              <option value="select">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
        {/* <button className="google-signup">Sign Up with Google</button> */}
      </div>
    </div>
  );
};

export default Signup;