import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const loginFormKeys = {
  Email: "email",
  Password: "password",
  RememberMe: "rememberMe",
};

export default function Login({ onLogin }) {
  const [values, setValues] = useState({
    [loginFormKeys.Email]: "",
    [loginFormKeys.Password]: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoginError(null);
      const response = await axios.post("http://localhost:3001/login", {
        email: values[loginFormKeys.Email],
        password: values[loginFormKeys.Password],
      });

      localStorage.setItem("token", response.data.token);

      onLogin();

      navigate("/");
    } catch (error) {
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="background-image3" />
      <div className="left-column">
        <div className="title-container">
          <h1>Welcome back!</h1>
          <p>We're so excited to see you again!</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailOrPassword">
            Email or phone number <span>*</span>
          </label>
          <input
            type="text"
            name={loginFormKeys.Email}
            id="email"
            placeholder="example@gmail.com"
            onChange={handleChange}
            value={values[loginFormKeys.Email]}
            autoComplete="username"
          />
          <label htmlFor="password">
            Password <span>*</span>
          </label>
          <input
            type="password"
            name={loginFormKeys.Password}
            id="password"
            onChange={handleChange}
            value={values[loginFormKeys.Password]}
            autoComplete="current-password"
          />
          <label htmlFor="rememberMe" className="remember">
            Remember Me
          </label>
          <input
            type="checkbox"
            name={loginFormKeys.RememberMe}
            id="rememberMe"
            onChange={() => setRememberMe(!rememberMe)}
            checked={rememberMe}
          />
          <Link to="/login">Forget your password?</Link>
          <input type="submit" value="Login" />
          {loginError && (
            <p className="error-message" style={{ color: "red", fontSize: "1.2em" }}>
              {loginError}
            </p>
          )}
        </form>
        <p>
          Need an account? <Link to="/register">Register</Link>
        </p>
      </div>
      <div className="vertical-separator" />
      <div className="right-column">
        <img src="/images/Example-QR-code.webp" alt="QR Code for scanning" />
        <h2>Log in with QR Code</h2>
        <p>
          Scan this with the <span className="bold">Mycar mobile app</span> to
          log instantly
        </p>
      </div>
    </div>
  );
}