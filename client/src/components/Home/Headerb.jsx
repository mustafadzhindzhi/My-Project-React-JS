import { Link } from "react-router-dom";

const Headerb = () => {
    return (
        <div className="headerb">
        <nav className="headerb-navigation">
            <ul className="nav-list">
            <li><Link to="/BuyCar">Buy Car</Link></li>
                <li><Link to="/sellWithUs">Sell with us</Link></li>
                 <li><Link to="/maintenance">Maintenance</Link></li>
            </ul>
        </nav>
    </div>
    )
}

export default Headerb;