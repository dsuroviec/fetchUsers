import React, { useState } from "react";
import {
    Route,
    Link,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { ContactUs } from "./components/ContactUs";
import "./App.css";

function App() {
    // If there is no token cookie, redirect to Login
    const [token, setToken] = useState<null | string>(null);

    console.log(token, "token");

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/contactUs">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Switch>
                <Route exact path="/">
                    <Home token={token} />
                </Route>
                <Route path="/contactUs">
                    <ContactUs token={token} />
                </Route>
                <Route path="/login">
                    <Login token={token} setToken={setToken} />
                </Route>
                <Route>
                    <Redirect to="/" />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
