import { isEmailValid, isPasswordValid } from "./validations.js";

export const handleEmailBlur = (email, setUserExistsError) => {
    if (email && !isEmailValid(email)) {
      setUserExistsError({ message: "Invalid email format" });
    }
  };
  
  export const handleUsernameBlur = (username, setUserExistsError) => {
    if (!username.trim()) {
      setUserExistsError({ message: "Username cannot be empty" });
    }
  };
  
  export const handlePasswordBlur = (password, setUserExistsError) => {
    if (password && !isPasswordValid(password)) {
      setUserExistsError({
        message: "Invalid Password",
      });
    }
  };