import { useContext, useState, useMemo } from "react";
import { Redirect } from "react-router-dom";
import TokenContext from "../contexts/TokenContext";
import { Button } from "./Button";
import { Input } from "./Input";
import { FormErrorMessage } from "./FormErrorMessage";
import UserContext from "../contexts/UserContext";

export const SignUp = () => {
    const { token, setToken } = useContext(TokenContext)!;
    const { user, setUser } = useContext(UserContext)!;
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [formErrors, setFormErrors] = useState<FormErrors>({
        firstNameError: "",
        lastNameError: "",
        usernameError: "",
        passwordError: "",
    });

    interface FormErrors {
        firstNameError?: string;
        lastNameError?: string;
        usernameError?: string;
        passwordError?: string;
    }

    // Form error validaton
    useMemo(() => {
        const errors: FormErrors = {};

        if (!firstName) {
            errors.firstNameError = "Required";
        }
        if (!lastName) {
            errors.lastNameError = "Required";
        }
        if (!username) {
            errors.usernameError = "Required";
        }
        if (!password) {
            errors.passwordError = "Required";
        }
        setFormErrors(errors);
    }, [firstName, lastName, username, password]);

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
                <h1>Register</h1>
                <form onSubmit={(event) => event.preventDefault()}>
                    <label>
                        <p>First Name</p>
                        <Input
                            value={firstName}
                            type="text"
                            onChange={(event) =>
                                setFirstName(event.target.value)
                            }
                        />
                        <FormErrorMessage
                            message={formErrors.firstNameError || ""}
                        />
                    </label>
                    <label>
                        <p>Last Name</p>
                        <Input
                            value={lastName}
                            type="text"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <FormErrorMessage
                            message={formErrors.lastNameError || ""}
                        />
                    </label>
                    <label>
                        <p>Username</p>
                        <Input
                            value={username}
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <FormErrorMessage
                            message={formErrors.usernameError || ""}
                        />
                    </label>
                    <label>
                        <p>Password</p>
                        <Input
                            value={password}
                            type="text"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormErrorMessage
                            message={formErrors.passwordError || ""}
                        />
                    </label>

                    <Button
                        // disabled={
                        //     formErrors.firstNameError?length>0 ||
                        //         formErrors.firstNameError?length>0 ||
                        //         formErrors.usernameError?length>0 ||
                        //         formErrors.passwordError?length>0:true
                        // }
                        className="btn"
                        children="Sign Up"
                        style={{}}
                        onClick={async () => {
                            const user = await fetch("/api/signup", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    firstName,
                                    lastName,
                                    username,
                                    password,
                                }),
                            }).then((response) => response.json());
                            console.log(user.token, " here is my token");
                            // If user exists, set context

                            if (user.token) {
                                setToken(user.token);
                                setUser({ firstName, lastName, username });
                                localStorage.setItem("token", user.token);
                            }
                        }}
                    />
                </form>
            </div>
        </>
    );
};
