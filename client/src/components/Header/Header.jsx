import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext.jsx"; 

const Header  = () => {
  const {
    isAuthenticated,
    username
  } = useContext(AuthContext);

    return (
        <header>
        <Link to="/">
          <img src="/images/MYCAR.png" alt="" />
        </Link>
        <nav className="header-navigation">
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/BuyCar">Buy Car</Link></li>
            {isAuthenticated && ( <>
            <li className="dropdown">
              <Link>Sell Car</Link>
              <ul className="dropdown-menu">
                <li><Link to="/sellWithUs">Sell with Us</Link></li>
                <li><Link to="/sell">Sell your car</Link></li>
              </ul>
            </li>
            <li className="dropdown">
              <Link to="/maintenance">Maintenance</Link>
              {/* <ul className="dropdown-menu">
                <li><Link to="#">Change motor oil and filters</Link></li>
                <li><Link to="#">Replace spark plugs</Link></li>
                <li><Link to="#">Change tires</Link></li>
                <li><Link to="#">Others</Link></li>
              </ul> */}
            </li>
            <li><Link to="/contacts">Contact Us</Link></li>
            <li id="logout"><Link to="/logout">Logout</Link></li>
            <span id="span-welcome">Wellcome {username}!</span>
            
            </>)}
            
            {!isAuthenticated && (
              <>
              <li><Link to="/sellWithUs">Sell with Us</Link></li>
              <li className="dropdown">
              <Link to="/maintenance">Maintenance</Link>
              {/* <ul className="dropdown-menu">
                <li><Link to="#">Change motor oil and filters</Link></li>
                <li><Link to="#">Replace spark plugs</Link></li>
                <li><Link to="#">Change tires</Link></li>
                <li><Link to="#">Others</Link></li>
              </ul> */}
            </li>
            <li><Link to="/contacts">Contact Us</Link></li>
              <div className="login-register">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
        </div>
        </>
            )}
        
          </ul>
        </nav>
      </header>
    )
}

export default Header;