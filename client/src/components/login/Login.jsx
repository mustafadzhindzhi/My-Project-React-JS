import { useContext, useState } from "react";
import useForm from "../../hooks/useForm.js";
import AuthContext from "../../contexts/authContext.jsx";
import { Link } from "react-router-dom";

const loginFormKeys = {
  Email: "email",
  Password: "password",
  RememberMe: "rememberMe",
};

export default function Login() {
  const { loginSubmitHandler } = useContext(AuthContext);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const { values, onChange, onSubmit } = useForm(
    async () => {
      try {
        setLoginError(null); 
        await loginSubmitHandler(values, rememberMe);
      } catch (error) {
        setLoginError("Invalid email or password. Please try again.");
      }
    },
    {
      [loginFormKeys.Email]: "",
      [loginFormKeys.Password]: "",
    }
  );

  return (
    <div className="login-container">
      <div className="background-image3" />
      <div className="left-column">
        <div className="title-container">
          <h1>Welcome back!</h1>
          <p>We're so excited to see you again!</p>
        </div>
        <form onSubmit={onSubmit}>
          <label htmlFor="emailOrPassword">
            Email or phone number <span>*</span>
          </label>
          <input
            type="text"
            name={loginFormKeys.Email}
            id="email"
            placeholder="example@gmail.com"
            onChange={onChange}
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
            onChange={onChange}
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