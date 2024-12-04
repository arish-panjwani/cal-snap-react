  import login_page_img  from "../../assets/images/login_page_img.png"
  import logo_img  from "../../assets/images/logo.png"
  import { strings } from "../../res/strings"
  import React, { useState } from "react";
  import "../../scenes/login/styles.css";
  import { useAuth } from '../../api/AuthContext';
  import { useNavigate } from 'react-router-dom';
  
  function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isLoggingIn, loginError } = useAuth();
    const navigate = useNavigate();

const mockUserData = {
  id: 1,
  name: "John Doe",
  email: "johndoe@example.com",
  token: "mock-jwt-token",
};

const handleLogin = async (event) => {
  event.preventDefault();
  const body = { username: email, password };
  console.log(email + " " + password)
  try {
    var data = await login(body);
    console.log(data);
    console.log("Logged in successfully");
  } catch (error) {
    console.error("Login failed: ", error);
    alert("Login failed !!!");
  }
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
            <h2 className="login-heading-two">{strings.heading}</h2>
            <p>{strings.subHeading}</p>
            <form className="login-form" onSubmit={handleLogin}>
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
  }
  
  export default Login;
  