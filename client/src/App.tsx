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
import UserContext from "./contexts/UserContext";
function App() {
    const [token, setToken] = useState<null | string>(
        localStorage.token || null
    );
    interface User {
        firstName: string | null;
        lastName: string | null;
        username: string | null;
    }
    const [user, setUser] = useState<User>({
        firstName: null,
        lastName: null,
        username: null,
    });

    console.log(user, "usercontext");

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            <UserContext.Provider value={{ user, setUser }}>
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
            </UserContext.Provider>
        </TokenContext.Provider>
    );
}

export default App;
