/** @format */

// LoginForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_img from "../../src/assets/img/logo.png";
import login_page_img from "../../src/assets/img/login_page_img.png";
import { colors } from "../res/colors";
import { strings } from "../res/strings";
import "../res/styles.css";
import { URLs } from "../api/apiConstant";
import { APIRequest } from "../api/helper";
import { useMutation } from "@tanstack/react-query";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const navigate = useNavigate();

  const { mutate, isLoading, error: loginError } = useMutation({
    mutationFn: APIRequest,
    onSuccess: (data) => {
      // Success actions
      console.log(data);
      if (data){
        navigate("/dashboard");  
      }
      else {
        alert("Invalid user!")
      }
    },
    onError: (error) => {
      // Error actions
      console.error(error);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = { username: email, password };
    mutate({ urlRequest: URLs.GET_USER});
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-image">
          <img src={login_page_img} alt="Calorie Tracking App"/>
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
              <label htmlFor="username">{strings.usernameLabel}</label>
              <input
                  type="email"
                  id="email"
                  placeholder={strings.usernamePlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  required />
            </div>
            <div className="input-field">
              <label htmlFor="password">{strings.passwordLabel}</label>
              <input
                  type="password"
                  id="password"
                  placeholder={strings.passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  required />
            </div>
            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember Me</label>
              </div>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
          <p className="signup-link">
            New Here? <a href="/signup">Sign Up</a>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div
  //     className="container"
  //     style={{
  //       background: isDarkTheme
  //         ? `linear-gradient(135deg, ${colors.dark.background}, ${colors.dark.button})`
  //         : `linear-gradient(135deg, ${colors.light.background}, ${colors.light.button})`,
  //     }}>
  //     <div className="theme-switcher">
  //       <label className="switch">
  //         <input
  //           type="checkbox"
  //           checked={!isDarkTheme}
  //           onChange={() => setIsDarkTheme(!isDarkTheme)}
  //         />
  //         <span className="slider round"></span>
  //       </label>
  //       <span>{isDarkTheme ? "Dark Mode" : "Light Mode"}</span>
  //     </div>
  //     <div className="image-section">
  //       <img
  //         // src="https://via.placeholder.com/600x800" // Replace with your image URL
  //         src={login_img} // Replace with your image URL
  //         alt="Placeholder"
  //         className="image"
  //       />
  //     </div>
  //     <div
  //       className="form-section"
  //       style={{
  //         backgroundColor: isDarkTheme
  //           ? colors.dark.formBackground
  //           : colors.light.formBackground,
  //         color: isDarkTheme ? colors.dark.text : colors.light.text,
  //       }}>
  //       <div className="form-container">
  //         <div className="logo-container">
  //           <div
  //             className="logo"
  //             style={{
  //               color: isDarkTheme ? colors.dark.logo : colors.light.logo,
  //             }}>
  //             {strings.logoText}
  //           </div>
  //           <div className="slogan">{strings.slogan}</div>
  //         </div>
  //         <h2 className="heading">{strings.heading}</h2>
  //         <form onSubmit={handleSubmit}>
  //           <input
  //             type="email"
  //             placeholder={strings.emailPlaceholder}
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             className="input"
  //             required
  //             style={{
  //               backgroundColor: isDarkTheme
  //                 ? colors.dark.inputBackground
  //                 : colors.light.inputBackground,
  //               color: isDarkTheme ? colors.dark.text : colors.light.text,
  //               borderColor: isDarkTheme ? "#333" : "#ddd",
  //             }}
  //           />
  //           <input
  //             type="password"
  //             placeholder={strings.passwordPlaceholder}
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             className="input"
  //             required
  //             style={{
  //               backgroundColor: isDarkTheme
  //                 ? colors.dark.inputBackground
  //                 : colors.light.inputBackground,
  //               color: isDarkTheme ? colors.dark.text : colors.light.text,
  //               borderColor: isDarkTheme ? "#333" : "#ddd",
  //             }}
  //           />
  //           <button
  //             type="submit"
  //             className="button"
  //             style={{
  //               backgroundColor: isDarkTheme
  //                 ? colors.dark.button
  //                 : colors.light.button,
  //             }}>
  //             {strings.buttonText}
  //           </button>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default LoginForm;