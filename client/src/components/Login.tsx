import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import TokenContext from "../contexts/TokenContext";
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
                        <input
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Password</p>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button
                        type="submit"
                        onClick={async () => {
                            const token: string = await fetch("/api/token", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ username }),
                            }).then((response) => response.json());

                            // If user exists, set context
                            console.log(token);
                            if (username && token.length) {
                                setToken(token);
                                localStorage.setItem("username", username);
                            }
                        }}
                    >
                        Set Token To Truthy
                    </button>
                </form>
            </div>
        </>
    );
};
