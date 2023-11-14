const Header  = () => {
    return (
        <header>
        <a href="/">
          <img src="src/assets/images/MYCAR.png" alt="" />
        </a>
        <nav className="header-navigation">
          <ul className="nav-list">
            <li><a href="/">Home</a></li>
            <li><a href="/BuyCar">Buy Car</a></li>
            <li className="dropdown">
              <a>Sell Car</a>
              <ul className="dropdown-menu">
                <li><a href="/sellYourCar">Sell with Us</a></li>
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
    )
}

export default Header;