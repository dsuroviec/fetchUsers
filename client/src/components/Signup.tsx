import { useContext, useState, useMemo } from "react";
import { Redirect } from "react-router-dom";
import TokenContext from "../contexts/TokenContext";
import { Button } from "./Button";
import { Input } from "./Input";
import { FormErrorMessage } from "./FormErrorMessage";
import { useFormik } from "formik";
export const SignUp = () => {
    const { token, setToken } = useContext(TokenContext)!;
    // const [firstName, setFirstName] = useState<string>("");
    // const [lastName, setLastName] = useState<string>("");
    // const [username, setUsername] = useState<string>("");
    // const [password, setPassword] = useState<string>("");

    interface Fields {
        firstName?: string;
        lastName?: string;
        username?: string;
        password?: string;
    }

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            username: "",
            password: "",
        },
        validate: ({ firstName, lastName, username, password }) => {
            const errors: Fields = {};
            if (!firstName) {
                errors.firstName = "required";
            }
            if (!lastName) {
                errors.lastName = "required";
            }
            if (!username) {
                errors.username = "required";
            }
            if (!password) {
                errors.password = "required";
            }
            return errors;
        },
        onSubmit: async ({ firstName, lastName, username, password }) => {
            const token = await fetch("/api/signup", {
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
            }).then((response) => response.text());
            if (token) {
                setToken(token);
                localStorage.setItem("token", token);
            }
        },
    });

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
                <form onSubmit={formik.handleSubmit}>
                    <label>
                        <p>First Name</p>
                        <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />
                        {formik.errors.firstName ? (
                            <div className="text-red-600 text-xs">
                                {formik.errors.firstName}
                            </div>
                        ) : null}
                    </label>
                    <label>
                        <p>Last Name</p>
                        <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />
                        {formik.errors.lastName ? (
                            <div className="text-red-600 text-xs">
                                {formik.errors.lastName}
                            </div>
                        ) : null}
                    </label>
                    <label>
                        <p>Username</p>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                        />
                        {formik.errors.username ? (
                            <div className="text-red-600 text-xs">
                                {formik.errors.username}
                            </div>
                        ) : null}
                    </label>
                    <label>
                        <p>Password</p>
                        <Input
                            id="password"
                            name="password"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.errors.password ? (
                            <div className="text-red-600 text-xs">
                                {formik.errors.password}
                            </div>
                        ) : null}
                    </label>

                    <Button className="btn" type="submit" children="Sign Up" />
                </form>
            </div>
        </>
    );
};
