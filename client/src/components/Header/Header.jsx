import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaCar, FaWrench } from 'react-icons/fa';
import { MdOutlineRestaurantMenu } from 'react-icons/md'
import AuthContext from "../../contexts/authContext.jsx";

const Header = () => {
  const { isAuthenticated, username } = useContext(AuthContext);
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <header>
      <Link to="/">
        <img src="/images/MYCAR.png" alt="" className="header-logo" />
      </Link>
      <nav className="header-navigation">
        <ul className="nav-list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/BuyCar">Buy Car</Link></li>
          {isAuthenticated ? (
            <>
              <li className="dropdown">
                <Link to="#">Sell Car</Link>
                <ul className="dropdown-menu">
                  <li><Link to="/sellWithUs">Sell with Us</Link></li>
                  <li><Link to="/sell">Sell your car</Link></li>
                </ul>
              </li>
              <li className="dropdown">
                <Link to="/maintenance">Maintenance</Link>
              </li>
              <li><Link to="/contacts">Contact Us</Link></li>
              <li id="logout"><Link to="/logout">Logout</Link></li>
              <span id="span-welcome">Welcome {username}!</span>
            </>
          ) : (
            <>
              <li><Link to="/sellWithUs">Sell with Us</Link></li>
              <li className="dropdown">
                <Link to="/maintenance">Maintenance</Link>
              </li>
              <li><Link to="/contacts">Contact Us</Link></li>
              <div className="login-register">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
            </>
          )}
        </ul>
        <div className="app__navbar-smallscreen">
          <FaCar fontSize={30} onClick={() => setToggleMenu(true)} />
          {toggleMenu && (
            <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
              <FaWrench fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
              <ul className="app__navbar-smallscreen_links">
                <li><Link to="/" onClick={() => setToggleMenu(false)}>Home</Link></li>
                <li><Link to="/BuyCar" onClick={() => setToggleMenu(false)}>Buy Car</Link></li>
                <li onClick={() => setToggleMenu(false)}>
                  <Link to="/sellWithUs">Sell Car</Link>
                  <ul className="dropdown-menu">
                    <li><Link to="/sellWithUs">Sell with Us</Link></li>
                    <li><Link to="/sell">Sell your car</Link></li>
                  </ul>
                </li>
                <li onClick={() => setToggleMenu(false)}><Link to="/maintenance">Maintenance</Link></li>
                <li onClick={() => setToggleMenu(false)}><Link to="/contacts">Contact Us</Link></li>
                {isAuthenticated && (
                  <>
                    <li id="logout" onClick={() => setToggleMenu(false)}><Link to="/logout">Logout</Link></li>
                    <span id="span-welcome">Welcome {username}!</span>
                  </>
                )}
                {!isAuthenticated && (
                  <>
                    <li onClick={() => setToggleMenu(false)}><Link to="/login">Login</Link></li>
                    <li onClick={() => setToggleMenu(false)}><Link to="/register">Register</Link></li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
