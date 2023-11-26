export default function CarItem() {
        return (
            <div>
              <meta charSet="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Car Details</title>
              <link rel="icon" type="image/png" href="assets/images/MYCAR.png" />
              <link rel="stylesheet" href="/assets/css/details.css" />
              <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
              <header>
                <a href="index.html">
                  <img src="assets/images/MYCAR.png" alt="" />
                </a>
                <nav className="header-navigation">
                  <ul className="nav-list">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="buyCar.html">Buy Car</a></li>
                    <li className="dropdown">
                      <a>Sell Car</a>
                      <ul className="dropdown-menu">
                        <li><a href="sellYourCar.html">Sell with Us</a></li>
                        <li><a href="sellCar.html">Sell your car</a></li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <a href="maintenance.html">Maintenance</a>
                      <ul className="dropdown-menu">
                        <li><a href="#">Change motor oil and filters</a></li>
                        <li><a href="#">Replace spark plugs</a></li>
                        <li><a href="#">Change tires</a></li>
                        <li><a href="#">Others</a></li>
                      </ul>
                    </li>
                    <li><a href="contact.html">Contact Us</a></li>
                  </ul>
                </nav>
                <div className="login-register">
                  <a href="login.html">Login</a>
                  <a href="register.html">Register</a>
                </div>
              </header>
              <div className="car-details">
                <div className="car-image">
                  <div className="swiper-container">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide"><img src="assets/images/audi a4 1.jpeg" alt="Car Image" /></div>
                      <div className="swiper-slide"><img src="assets/images/audi a4 2.jpeg" alt="Car Image" /></div>
                      <div className="swiper-slide"><img src="assets/images/audi a4 3.jpeg" alt="Car Image" /></div>
                    </div>
                    <div className="swiper-button-next" style={{right: '5px', color: 'white'}} />
                    <div className="swiper-button-prev" style={{left: '30px', color: 'white'}} />
                  </div>
                </div>
                <div className="car-info">
                  <h2>Audi A4</h2>
                  <p>Price: $7800</p>
                  <p>Brand: Audi</p>
                  <p>Model: A4</p>
                  <p>Fuel: Gasoline</p>
                  <p>Transmission: Automatic</p>
                  <p>Comfort: Leather seats, climate control, sunroof</p>
                  <p>Rating: <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span></p>
                  <div className="buttons">
                    <button className="like-button">Like</button>
                    <button className="like-button">Edit</button>
                    <button className="like-button">Delete</button>
                  </div>
                </div>
              </div>
              <div className="car-description">
                <h2>Car Description</h2>
                <p>This Audi A4 is a premium sedan with excellent features...</p>
              </div>
              <section className="car-description">
                <h3>Description</h3>
                <p>This is a detailed description of the car. It provides information about the car's features, performance, and more. You can add any additional details you want to highlight about the car here.</p>
              </section>
              <footer className="section-p1">
                <div className="col">
                  <img className="logo" src="assets/images/MYCAR.png" alt="" />
                  <h4>Contact</h4>
                  <p><strong>Address:</strong> Kliment Ohridski №72, Kornitsa, Bulgaria</p>
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
                  <a href="/about.html">About Us</a>
                  <a href="#">Delivery Information</a>
                  <a href="#">Privacy Policy</a>
                  <a href="#">Terms &amp; Conditions</a>
                  <a href="/contact.html">Contact Us</a>
                </div>
                <div className="col">
                  <h4>My Account</h4>
                  <a href="#">Sign In</a>
                  <a href="#">View Cart</a>
                  <a href="#">My Wishlist</a>
                  <a href="#">Track My Order</a>
                  <a href="#">Help</a>
                </div>
                <div className="col install">
                  <h4>Install App</h4>
                  <p>From App Store or Google Play</p>
                  <div className="row">
                    <img src="assets/images/app.jpg" alt="" />
                    <img src="assets/images/play.jpg" alt="" />
                  </div>
                  <p>Secured Payment Gateways</p>
                  <img src="assets/images/pay.png" alt="" />
                </div>
                <div className="copyright">
                  <p>© Mycar.com, Inc. All rights reserved.</p>
                </div>
              </footer>
              <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
            </div>
          );
}
