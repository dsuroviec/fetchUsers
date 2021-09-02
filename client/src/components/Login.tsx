import React from "react";
import { Redirect } from "react-router-dom";

type LoginProps = {
    token: string | null;
    setToken: Function;
};

export const Login = ({ token, setToken }: LoginProps) => {
    const handleLogin = () => {
        // If authentication passes, set token, which redirects the component
        setToken("some token");
    };

    return (
        <>
            {token && <Redirect to="/" />}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h1>Please Log In</h1>
                <form onSubmit={(event) => event.preventDefault()}>
                    <label>
                        <p>Username</p>
                        <input type="text" />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" />
                    </label>
                    <button type="submit" onClick={() => handleLogin()}>
                        Set Token To Truthy
                    </button>
                </form>
            </div>
        </>
    );
};
