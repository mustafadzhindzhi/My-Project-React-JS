export default function Login(){
    return (

        <div className="login-container">
          <div className="background-image3" />
          <div className="left-column">
            <div className="title-container">
              <h1>Welcome back!</h1>
              <p>We're so excited to see you again!</p>
            </div>
            <form method="POST">
              <label htmlFor="emailOrPassword">Email or phone number <span>*</span></label>
              <input type="text" name="email" id="email" />
              <label htmlFor="password">Password <span>*</span></label>
              <input type="password" name="password" id="password" />
              <a href="#">Forget your password?</a>
              <input type="submit" defaultValue="Log In" />
            </form>
            <p>Need an account? <a href="register.html">Register</a></p>
          </div>
          <div className="vertical-separator" />
          <div className="right-column">
            <img src="/images/Example-QR-code.webp" alt="QR Code for scanning" />
            <h2>Log in with QR Code</h2>
            <p>Scan this with the <span className="bold">Mycar mobile app</span> to log instantly</p>
          </div>     
        </div>
      );
}