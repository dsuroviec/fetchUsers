import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";
import { Button } from "./Button";
export const Home = () => {
    const [users, setUsers] = useState<User[] | null>(null);
    const { token } = useContext(TokenContext)!;
    const { user } = useContext(UserContext)!;
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
            <div
                style={{
                    textAlign: "center",
                    marginTop: "50px",
                }}
            >
                <h1 className="text-3xl">{`Welcome ${user.firstName}`}</h1>
                <h1 className="text-xl">{`have a chilln' ${new Date().toLocaleDateString(
                    undefined,
                    { weekday: "long" }
                )}`}</h1>
                <Button className="m-auto" onClick={() => getusers()}>
                    Get Users
                </Button>
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
