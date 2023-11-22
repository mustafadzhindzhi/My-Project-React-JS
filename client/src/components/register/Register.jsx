export default function Register() {
    return (

        <div className="register-container">
          <div className="background-image4" />
          <div className="left-column">
            <div className="title-container">
              <h1>Create Account</h1>
              <p>We're so excited to see you!</p>
            </div>
            <form method="POST">
              <label htmlFor="emailOrPassword">Email or phone number <span>*</span></label>
              <input type="text" name="username" id="username" />
              <label htmlFor="password">Username <span>*</span></label>
              <input type="text" name="emailOrPassword" id="emailOrPassword" />
              <label htmlFor="password">Password <span>*</span></label>
              <input type="password" name="password" id="password" />
              <label htmlFor="password">Repeat Password <span>*</span></label>
              <input type="password" name="repeatPass" id="repeatPass" />
              <a href="login.html">You have an account, go to Login page</a>
              <input type="submit" defaultValue="Register" />
            </form>
            <p>Need an account? <a href="register.html">Register</a></p>
          </div>
        </div>
      );
}