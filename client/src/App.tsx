import { useState, useEffect } from "react";
import {
    Route,
    Link,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import { Home } from "./components/Home";
import { LogIn } from "./components/LogIn";
import { ContactUs } from "./components/ContactUs";
import { SignUp } from "./components/SignUp";
import "./App.css";
import TokenContext from "./contexts/TokenContext";
import UserContext from "./contexts/UserContext";
import { HiSun } from "react-icons/hi";
import { HiMoon } from "react-icons/hi";
import { HiOutlineStar } from "react-icons/hi";
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
                    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
                        <div className="flex items-center flex-shrink-0  mr-6">
                            <img
                                className="fill-red-500 h-8 w-8 mr-1"
                                alt="logo"
                                src="logo.svg"
                            ></img>
                            <HiOutlineStar className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 mr-2" />
                            <span className="font-semibold text-xl tracking-tight ">
                                Darren's App
                            </span>
                        </div>
                        <div className="block lg:hidden">
                            <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                                <svg
                                    className="fill-current h-3 w-3"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>Menu</title>
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                                </svg>
                            </button>
                        </div>
                        {token && (
                            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                                <div className="text-sm lg:flex-grow">
                                    <Link
                                        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 mr-4"
                                        to="/"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-blue-700  mr-4"
                                        to="/contactUs"
                                    >
                                        Contact Us
                                    </Link>
                                    <Link
                                        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-blue-700  mr-4"
                                        to="/logIn"
                                        onClick={() => {
                                            setToken(null);
                                            localStorage.removeItem("token");
                                        }}
                                    >
                                        Logout
                                    </Link>
                                </div>
                            </div>
                        )}
                    </nav>

                    <div className="absolute top-5 right-5 ">
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
                        <Route path="/logIn">
                            <LogIn />
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
