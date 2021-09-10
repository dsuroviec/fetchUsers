import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import TokenContext from "../contexts/TokenContext";
export const Home = () => {
    const [users, setUsers] = useState<User[] | null>(null);
    const { token } = useContext(TokenContext)!;
    interface User {
        id: number;
        firstname: string;
        lastname: string;
        username: string;
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
                        >{`${user.firstname} ${user.lastname} ${user.username}`}</div>
                    ))}
            </div>
        </>
    );
};
