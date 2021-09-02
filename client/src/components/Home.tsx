import React, { useState } from "react";
import { Redirect } from "react-router-dom";

type HomeProps = {
    token: string | null;
};

export const Home = ({ token }: HomeProps) => {
    const [users, setUsers] = useState<User[] | null>(null);

    interface User {
        id: number;
        firstname: string;
        lastname: string;
    }

    const getusers = async () => {
        const users: User[] = await fetch("/api/users").then((response) =>
            response.json()
        );
        setUsers(users);
    };
    return (
        <>
            {!token && <Redirect to="/login" />}
            <div style={{ textAlign: "center", marginTop: "200px" }}>
                <h1>HOMEPAGE</h1>

                <button onClick={() => getusers()}>Get Users</button>
                {users &&
                    users.map((user) => (
                        <div
                            key={user.id}
                        >{`${user.firstname} ${user.lastname}`}</div>
                    ))}
            </div>
        </>
    );
};
