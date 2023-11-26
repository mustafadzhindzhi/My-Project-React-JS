export default function Maintenance() {
    return (
        <div>
          <section id="hero">
            <h4>Feel free to trust US!</h4>
            <h2>Brand support for over 5 years now from €199</h2>
            <button>Book a maintenance</button>
          </section>
          <div className="headerb">
            <nav className="header-navigation">
              <ul className="nav-list">
                <li><a href="./buyCar.html">Buy Car</a></li>
                <li><a href="./sellYourCar.html">Sell your car</a></li>
                <li><a href="./maintenance.html">Maintenance</a></li>
              </ul>
            </nav>
          </div>
          <section className="container">
            <h1>See the prices and book a serivice appointment</h1>
            <div className="info">
              <div className="carInfo">
                <div className="carInfoCard">
                  <h2>Book support online</h2>
                  <form action className="carCard">
                    <div className="input-group">
                      <label htmlFor="carNumber">Car Number</label>
                      <div className="input-addon">
                        <span className="flag-icon">🇪🇺</span>
                        <input type="text" id="carNumber" name="carNumber" placeholder="Enter car number" />
                      </div>
                    </div>
                    <div className="input-group">
                      <label htmlFor="kilometers">Kilometers</label>
                      <input type="text" id="kilometers" name="kilometers" placeholder="Enter kilometers" />
                    </div>
                    <button id="go">Start the booking service</button>
                  </form>
                </div>
              </div>
              <div className="someInfo">
                <h2>MyCar brand support ensures the continuation of your journey - now and in the future.</h2>
                <img src="/images/1520211675081.jpeg" alt="" />
                <h2>Need help?</h2>
                <p>Our office in Sofia is currently busy. You should also check availability elsewhere.</p>
                <p>Contacts for the nearest MyCar office</p>
                <a href="contact.html">
                  <button>Contact Us</button>
                </a>
              </div>
            </div>
          </section>
          <section className="banners">
            <section id="sm-banner" className="section-p1">
              <div className="banner-box">
                <h4>Tire service</h4>
                <h2>Take Free Change</h2>
                <span>special offer from MyCar</span>
                <button className="white">Learn More!</button>
              </div>
              <div className="banner-box banner-box2">
                <h4>Winter is Coming</h4>
                <h2>Time For New Car</h2>
                <span>more than 50 brands</span>
                <button className="white">Collection</button>
              </div>
            </section>
            <section id="banner3">
              <div className="banner-box">
                <h2>GREAT DEAL</h2>
                <h3>Almost used Mercedes 6.3</h3>
              </div>
              <div className="banner-box banner-box2">
                <h2>The new BMW is here</h2>
                <h3>Need to check it</h3>
              </div>
              <div className="banner-box banner-box3">
                <h2>Family Time</h2>
                <h3>We take care of you</h3>
              </div>
            </section>
          </section>
        </div>
      );  
}