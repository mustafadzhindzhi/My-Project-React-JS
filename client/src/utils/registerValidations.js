import axios from "axios";
import { isEmailValid, isPasswordValid } from "./validations.js";

export const handleEmailBlur = async (e, setUserExistsError) => {
  const email = e.target.value;

  if (!email) {
    setUserExistsError(null);
    return;
  }

  if (!isEmailValid(email)) {
    setUserExistsError({ message: "Invalid email format" });
    return;
  }

  try {
    const response = await axios.get(
      `http://localhost:3001/checkEmail/${email}`
    );
    if (response.data.exists) {
      setUserExistsError({ message: "Email is already in use" });
    } else {
      setUserExistsError(null);
    }
  } catch (error) {
    console.error("Error checking email:", error);
    setUserExistsError({
      message: "Error checking email. Please try again.",
    });
  }
};

export const handleUsernameBlur = (username, setUserExistsError) => {
  if (!username.trim()) {
    setUserExistsError({ message: "Username cannot be empty" });
  } else {
    setUserExistsError(null); 
  }
};

export const handlePasswordChange = (password, setPassword, setUserExistsError) => {
  setPassword(password);
  setUserExistsError(null);
};

export const handlePasswordBlur = (password, setUserExistsError) => {
  if (password && !isPasswordValid(password)) {
    setUserExistsError({
      message: "Invalid Password",
    });
  } else {
    setUserExistsError(null); 
  }
};

export const handleSubmit = async (
  username,
  email,
  password,
  repeatPassword,
  setUserExistsError,
  onRegister,
  navigate
) => {
  if (!isEmailValid(email)) {
    setUserExistsError({ message: "Invalid email format" });
    return;
  }

  if (!isPasswordValid(password)) {
    setUserExistsError({
      message: "Invalid Password",
    });
    return;
  }

  if (password !== repeatPassword) {
    setUserExistsError({ message: "Passwords do not match" });
    return;
  }

  try {
    const response = await axios.post("http://localhost:3001/createUser", {
      username,
      email,
      password,
    });
    console.log(response.data);
    localStorage.setItem("token", response.data.token);
    onRegister();
    navigate("/");
  } catch (err) {
    console.error("Error registering user:", err);
    if (
      err.response &&
      err.response.status === 400 &&
      err.response.data &&
      err.response.data.message === "Email is already in use"
    ) {
      setUserExistsError({ message: "Email is already in use" });
    } else {
      setUserExistsError({
        message: "Registration failed. Please try again.",
      });
    }
  }
};


