import { Component } from "react";

export default class ErrorBoundary extends Component {
    constructor() {
        super();

        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(err) {
        console.log(`GetDerivedStateFromError`);
        return {
            hasError: true,
        };
    }

    componentDidCatch(error, errorInfo) {
        console.log(`componentDidCatch`);
    }

    render() {
        if (this.state.hasError) {
            return (
                <body>
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

                    <div className="main">
                        <img src="assets/images/road1.jpeg" alt="" />
                        <div className="centered-text">
                            <p>404 | OOPS!</p>
                            <h1>We made a wrong turn.</h1>
                            <h4>Not to worry. You can <a href="index.html">visit the homepage</a> or use the main menu above to find your way.</h4>
                        </div>
                    </div>
                </body>
            );
        }

        return this.props.children;
    }
}
