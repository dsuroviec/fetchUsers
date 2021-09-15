import { useState } from "react";
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
import { SignUp } from "./components/Signup";
import "./App.css";
import TokenContext from "./contexts/TokenContext";

function App() {
    const [token, setToken] = useState<null | string>(
        localStorage.token || null
    );

    return (
        <TokenContext.Provider value={{ token, setToken }}>
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
                            <li>
                                <Link to="/signUp">Sign Up</Link>
                            </li>
                            <li>
                                <Link
                                    to="/login"
                                    onClick={() => {
                                        setToken(null);
                                        localStorage.removeItem("token");
                                    }}
                                >
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/contactUs">
                        <ContactUs />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signUp">
                        <SignUp />
                    </Route>
                    <Route>
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </Router>
        </TokenContext.Provider>
    );
}

export default App;
