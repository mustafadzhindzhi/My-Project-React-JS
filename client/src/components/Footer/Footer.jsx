const Footer = () => {
    return (
        <footer className="section-p1">
          <div className="col">
            <img className="logo" src="/images/MYCAR.png" alt="" />
            <h4>Contact</h4>
            <p><strong>Our main office:</strong> Kliment Ohridski №72, Sofia, Bulgaria</p>
            <p><strong>Phone:</strong> +359899384275</p>
            <p><strong>Hours:</strong> 10:00 - 18:00, Mon-Sat</p>
            <div className="follow">
              <h4>Follow us</h4>
              <div className="icon">
                <i className="fab fa-facebook-f" />
                <i className="fab fa-twitter" />
                <i className="fab fa-instagram" />
                <i className="fab fa-pinterest-p" />
                <i className="fab fa-youtube" />
              </div>
            </div>
          </div>
          <div className="col">
            <h4>About</h4>
            <a href="/about.html">My-car Company</a>
            <a href="#">What is My-car?</a>
            <a href="#">Free positions</a>
            <a href="#">Mycar.bg</a>
            <a href="/contact.html">Contact Information</a>
          </div>
          <div className="col">
            <h4>My Account</h4>
            <a href="#">Sign In</a>
            <a href="#">Frequently Asked Questions</a>
            <a href="#">Actual</a>
            <a href="#">Customer experience</a>
            <a href="#">Help</a>
          </div>
          <div className="col install">
            <h4>Install App</h4>
            <p>From App Store or Google Play</p>
            <div className="row">
              <img src="/public/images/app.jpg" alt="" />
              <img src="/public/images/play.jpg" alt="" />
            </div>
            <p>Secured Payment Gateways</p>
            <img src="/public/images/pay.png" alt="" />
          </div>
          <div className="copyright">
            <p>© Mycar.com, Inc. All rights reserved.</p>
          </div>
        </footer>
    )
}

export default Footer;