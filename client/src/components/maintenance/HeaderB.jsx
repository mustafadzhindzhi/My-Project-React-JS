import { Link } from "react-router-dom"

export default function HeaderB( ){
    return (
        <div className="headerb">
        <nav className="header-navigation">
          <ul className="nav-list">
            <li>
              <Link to="/BuyCar">Buy Car</Link>
            </li>
            <li>
              <Link to="/sell">Sell your car</Link>
            </li>
            <li>
              <Link to="/contacts">Contact Us</Link>
            </li>
          </ul>
        </nav>
      </div>
    )
}