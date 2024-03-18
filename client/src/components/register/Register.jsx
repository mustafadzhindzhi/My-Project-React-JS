import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isEmailValid } from "../../utils/validations.js";
import { getPasswordStrengthColor } from "../../utils/passwordUtil.js";
import {
  handleEmailBlur,
  handleUsernameBlur,
  handlePasswordChange,
  handlePasswordBlur,
  handleSubmit
} from "../../utils/registerValidations.js";

export default function Register({ onRegister }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [userExistsError, setUserExistsError] = useState(null);
  const [isTypingRepeatPass, setIsTypingRepeatPass] = useState(false);
  const [isEmailChecking, setIsEmailChecking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEmailValid(email)) {
      setIsEmailChecking(true);
      handleEmailBlur({ target: { value: email } }, setUserExistsError)
        .then(() => setIsEmailChecking(false))
        .catch(() => setIsEmailChecking(false));
    }
  }, [email]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(username, email, password, repeatPassword, setUserExistsError, onRegister, navigate);
  };

  return (
    <div className="register-container">
      <div className="background-image4" />
      <div className="left-column">
        <div className="title-container">
          <h1>Create Account</h1>
          <p>We're so excited to see you!</p>
        </div>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">
            Email<span>*</span>
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => handleEmailBlur(e, setUserExistsError)}
            className={isEmailValid(email) ? "valid" : "invalid"}
          />
          {isEmailChecking && <p className="success-message">Checking email...</p>}
          {!isEmailChecking && isEmailValid(email) && userExistsError && userExistsError.message === "Email is already in use" && (
            <p className="error-message" style={{ color: "red" }}>
              {userExistsError.message}
            </p>
          )}
          {!isEmailChecking && isEmailValid(email) && !userExistsError && (
            <p className="success-message">Valid Email!</p>
          )}

          <label htmlFor="username">
            Username <span>*</span>
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUserExistsError(null);
            }}
            onBlur={() => handleUsernameBlur(username, setUserExistsError)}
          />
          {username && userExistsError && (
            <p className="error-message" style={{ color: "red" }}>
              {userExistsError.message}
            </p>
          )}
          {username.trim() && !userExistsError && (
            <p className="success-message">Valid Username!</p>
          )}
          <label htmlFor="password">
            Password <span>*</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) =>
              handlePasswordChange(
                e.target.value,
                setPassword,
                setUserExistsError
              )
            }
            onBlur={() => handlePasswordBlur(password, setUserExistsError)}
            autoComplete="new-password"
            className="password-input"
          />
          {password && (
            <div className="password-strength">
              <div
                className={`strength-indicator red ${
                  getPasswordStrengthColor(password) === "weak"
                    ? "visible"
                    : "visible"
                }`}
              />
              <div
                className={`strength-indicator orange ${
                  getPasswordStrengthColor(password) === "medium" ||
                  getPasswordStrengthColor(password) === "strong"
                    ? "visible"
                    : "hidden"
                }`}
              />
              <div
                className={`strength-indicator green ${
                  getPasswordStrengthColor(password) === "strong"
                    ? "visible"
                    : "hidden"
                }`}
              />
            </div>
          )}

          <label htmlFor="repeatPassword">
            Repeat Password <span>*</span>
          </label>
          <input
            type="password"
            name="repeatPassword"
            id="repeatPassword"
            value={repeatPassword}
            onChange={(e) => {
              setIsTypingRepeatPass(true);
              setRepeatPassword(e.target.value);
            }}
            onBlur={() => handlePasswordBlur(password, setUserExistsError)}
            autoComplete="new-password"
            className={
              isTypingRepeatPass && password !== repeatPassword
                ? "invalid"
                : "valid"
            }
          />
          {isTypingRepeatPass && password !== repeatPassword && (
            <p className="error-message" style={{ color: "red" }}>
              Passwords do not match
            </p>
          )}
          {!isTypingRepeatPass && (
            <p className="success-message">Passwords match!</p>
          )}
          <input type="submit" value="Register" />
        </form>
        <p>
          You already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
