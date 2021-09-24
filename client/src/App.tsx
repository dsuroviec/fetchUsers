import { useState, useEffect } from "react";
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
import { HiSun } from "react-icons/hi";
import { HiMoon } from "react-icons/hi";
function App() {
    const [token, setToken] = useState<null | string>(
        localStorage.token || null
    );
    const [theme, setTheme] = useState(localStorage.theme || "light");
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

    useEffect(() => {
        if (token) {
            const user = async () => {
                const user = await fetch("/api/me", {
                    headers: {
                        Authorization: `token ${token}`,
                    },
                }).then((response) => response.json());
                if (user) {
                    setUser({
                        firstName: user.firstname,
                        lastName: user.lastname,
                        username: user.username,
                    });
                }
            };
            user();
        }
    }, [token]);

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
                    <div className="absolute top-8 right-8 ">
                        <button
                            onClick={() => {
                                if (theme === "dark") {
                                    localStorage.setItem("theme", "light");
                                    setTheme("light");
                                    document.documentElement.classList.remove(
                                        "dark"
                                    );
                                } else {
                                    localStorage.setItem("theme", "dark");
                                    setTheme("dark");
                                    document.documentElement.classList.add(
                                        "dark"
                                    );
                                }
                            }}
                        >
                            {theme === "dark" ? (
                                <HiSun className="text-yellow-500" size="2em" />
                            ) : (
                                <HiMoon className="text-blue-900" size="2em" />
                            )}
                        </button>
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
