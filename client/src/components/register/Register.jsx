import { useContext } from "react";
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

  const { values, onChange, onSubmit, isSubmitting } = useForm(
    typeof registerSubmitHandler === 'function' ? registerSubmitHandler : () => {},
    {
      [registerFormKeys.Email]: '',
      [registerFormKeys.Username]: '',
      [registerFormKeys.Password]: '',
      [registerFormKeys.ConfirmPassword]: '',
    }
  );

  const passwordMismatchError = values[registerFormKeys.Password] !== values[registerFormKeys.ConfirmPassword];

    return (

        <div className="register-container">
          <div className="background-image4" />
          <div className="left-column" >
            <div className="title-container">
              <h1>Create Account</h1>
              <p>We're so excited to see you!</p>
            </div>
            <form onSubmit={onSubmit}>
              <label htmlFor="emailOrPassword">Email<span>*</span></label>
              <input type="text" name="email" id="email" value={values[registerFormKeys.Email]} onChange={onChange}/>
              <label htmlFor="password">Username <span>*</span></label>
              <input type="text" name="username" id="username"  value={values[registerFormKeys.Username]} onChange={onChange}/>
              <label htmlFor="password">Password <span>*</span></label>
              <input type="password" name="password" id="password" value={values[registerFormKeys.Password]} onChange={onChange} autoComplete="new-password"/>
              <label htmlFor="password">Repeat Password <span>*</span></label>
              <input type="password" name="repeatPass" id="repeatPass" value={values[registerFormKeys.ConfirmPassword]} onChange={onChange} autoComplete="new-password" />
              {passwordMismatchError && <p className="error-message" style={{ color: 'red' }}>Passwords do not match</p>}
              <input type="submit" defaultValue="Register" />
            </form>
            <p>You already have an accout? <Link to="/login">Login</Link></p>
          </div>
        </div>
      );
}