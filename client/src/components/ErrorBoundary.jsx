import { Component } from "react";
import { Link } from "react-router-dom";

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

                    <div className="main">
                        <img src="/public/images/road1.jpeg" alt="" />
                        <div className="centered-text">
                            <p>404 | OOPS!</p>
                            <h1>We made a wrong turn.</h1>
                            <h4>Not to worry. You can <Link to="index.html">visit the homepage</Link> or use the main menu above to find your way.</h4>
                        </div>
                    </div>
                </body>
            );
        }

        return this.props.children;
    }
}
