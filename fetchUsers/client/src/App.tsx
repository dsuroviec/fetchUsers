import React, { useState } from "react";

import "./App.css";

function App() {
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
        <div>
            <button onClick={() => getusers()}>Click Me!</button>
            {users &&
                users.map((user) => (
                    <div>{`${user.firstname} ${user.lastname}`}</div>
                ))}
        </div>
    );
}

export default App;
