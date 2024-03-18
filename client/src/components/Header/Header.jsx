import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCar, FaWrench } from "react-icons/fa";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const token = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );
  
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("token") ? true : false);
  }, [localStorage.getItem("token")]);
  
  return (
    <header className="navbar">
      <Link to="/">
        <img src="/images/MYCAR.png" alt="" className="header-logo" />
      </Link>
      <nav className="header-navigation">
        <div>
          <ul className="nav-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/BuyCar">Buy Car</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li className="dropdown">
                  <Link to="#">Sell Car</Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/sellWithUs">Sell with Us</Link>
                    </li>
                    <li>
                      <Link to="/sell">Sell your car</Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown">
                  <Link to="/maintenance">Maintenance</Link>
                </li>
                <li>
                  <Link to="/contacts">Contact Us</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/sellWithUs">Sell with Us</Link>
                </li>
                <li className="dropdown">
                  <Link to="/maintenance">Maintenance</Link>
                </li>
                <li>
                  <Link to="/contacts">Contact Us</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="login-register">
          {isAuthenticated ? (
            <>
              <li
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>

        <div className="app__navbar-smallscreen">
          <FaCar fontSize={30} onClick={() => setToggleMenu(true)} />
          {toggleMenu && (
            <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
              <FaWrench
                fontSize={27}
                className="overlay__close"
                onClick={() => setToggleMenu(false)}
              />
              <ul className="app__navbar-smallscreen_links">
                <li>
                  <Link to="/" onClick={() => setToggleMenu(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/BuyCar" onClick={() => setToggleMenu(false)}>
                    Buy Car
                  </Link>
                </li>
                <li className="dropdown">
                  <Link to="#">Sell Car</Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        to="/sellWithUs"
                        onClick={() => setToggleMenu(false)}
                      >
                        Sell with Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/sell" onClick={() => setToggleMenu(false)}>
                        Sell your car
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/maintenance" onClick={() => setToggleMenu(false)}>
                    Maintenance
                  </Link>
                </li>
                <li>
                  <Link to="/contacts" onClick={() => setToggleMenu(false)}>
                    Contact Us
                  </Link>
                </li>
                {isAuthenticated ? (
                  <>
                    <li
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/";
                      }}
                    >
                      Logout
                    </li>
                  </>
                ) : <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
