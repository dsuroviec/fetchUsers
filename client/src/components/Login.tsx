import { useContext, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import TokenContext from "../contexts/TokenContext";
import { Button } from "./Button";
import { Input } from "./Input";
export const Login = () => {
    const [username, setUsername] = useState<string | null>();
    const [password, setPassword] = useState<string | number>();

    const { token, setToken } = useContext(TokenContext)!;
    interface User {
        id: number;
        firstname: string;
        lastname: string;
        username: string;
    }

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
                        <Input
                            placeholder="First Name"
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Password</p>
                        <Input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <Button
                        type="submit"
                        onClick={async () => {
                            const token: string = await fetch("/api/token", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ username, password }),
                            }).then((response) => response.text());

                            // If user exists, set context
                            if (token) {
                                setToken(token);
                                localStorage.setItem("token", token);
                            }
                        }}
                    >
                        Log In
                    </Button>
                    <Link className="btn" to="/signUp">
                        SignUp
                    </Link>
                </form>
            </div>
        </>
    );
};
