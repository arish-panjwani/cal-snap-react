import login_page_img  from "../../assets/images/login_page_img.png"
  import logo_img  from "../../assets/images/logo.png"
  import { strings } from "../../res/strings"
  import React, { useState } from "react";
  import "../../scenes/login/styles.css"
  
  function Signup() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [dob, setDOB] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (event) => {
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
                <label htmlFor="name">{strings.fullNameLabel}</label>
                <input
                    type="text"
                    id="name"
                    placeholder={strings.fullNamePlaceHolder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    required />
              </div>
              <div className="input-field">
                <label htmlFor="dateOfBirth">{strings.dateOfBirthLabel}</label>
                <input
                    type="date"
                    id="dob"
                    placeholder={strings.dateOfBirthPlaceHolder}
                    value={dob}
                    onChange={(e) => setDOB(e.target.value)}
                    className="input"
                    required />
              </div>
              <div className="input-field">
                <label htmlFor="username">{strings.emailLabel}</label>
                <input
                    type="email"
                    id="email"
                    placeholder={strings.emailPlaceholder}
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
              <div className="input-field">
                <label htmlFor="password">{strings.confirmPasswordLabel}</label>
                <input
                    type="password"
                    id="password"
                    placeholder={strings.confirmPasswordPlaceholder}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input"
                    required />
              </div>
              <button type="submit" className="login-button">Signup</button>
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