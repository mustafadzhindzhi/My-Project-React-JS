import { useContext, useState } from "react";
import AuthContext from "../../contexts/authContext.jsx";
import useForm from "../../hooks/useForm.js";
import { Link } from "react-router-dom";

const registerFormKeys = {
  Email: 'email',
  Username: 'username',
  Password: 'password',
  ConfirmPassword: 'repeatPass',
};

export default function Register() {
  const authContext = useContext(AuthContext);
  const { registerSubmitHandler } = authContext || {};

  const [userExistsError, setUserExistsError] = useState(null);
  const [isTypingRepeatPass, setIsTypingRepeatPass] = useState(false);

  const { values, onChange, onSubmit } = useForm(
    async () => {
      try {
        setUserExistsError(null);
        await registerSubmitHandler(values);

      } catch (error) {
        console.error("Registration error:", error);

        if (error.code === 409) {
          setUserExistsError(error);
        }
      }
    },
    {
      [registerFormKeys.Email]: "",
      [registerFormKeys.Username]: "",
      [registerFormKeys.Password]: "",
      [registerFormKeys.ConfirmPassword]: "",
    }
  );

  const isFormValid = () => {
    // Check if any of the fields are empty
    return Object.values(values).every((value) => value.trim() !== '');
  };

  const passwordMismatchError =
    isTypingRepeatPass && values[registerFormKeys.Password] !== values[registerFormKeys.ConfirmPassword];

  return (
    <div className="register-container">
      <div className="background-image4" />
      <div className="left-column">
        <div className="title-container">
          <h1>Create Account</h1>
          <p>We're so excited to see you!</p>
        </div>
        <form onSubmit={onSubmit}>
          <label htmlFor="emailOrPassword">Email<span>*</span></label>
          <input type="text" name="email" id="email" value={values[registerFormKeys.Email]} onChange={onChange} />
          <label htmlFor="password">Username <span>*</span></label>
          <input type="text" name="username" id="username" value={values[registerFormKeys.Username]} onChange={onChange} />
          <label htmlFor="password">Password <span>*</span></label>
          <input type="password" name="password" id="password" value={values[registerFormKeys.Password]} onChange={onChange} autoComplete="new-password" />
          <label htmlFor="password">Repeat Password <span>*</span></label>
          <input
            type="password"
            name="repeatPass"
            id="repeatPass"
            value={values[registerFormKeys.ConfirmPassword]}
            onChange={(e) => {
              setIsTypingRepeatPass(true);
              onChange(e);
            }}
            autoComplete="new-password"
          />
          {passwordMismatchError && (
            <p className="error-message" style={{ color: 'red' }}>
              Passwords do not match
            </p>
          )}
          {userExistsError && (
            <p className="error-message" style={{ color: 'red' }}>
              {userExistsError.message}
            </p>
          )}
          <input
            type="submit"
            value="Register"
            // Disable the submit button if the form is not valid
            disabled={!isFormValid()}
          />
        </form>
        <p>You already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}
