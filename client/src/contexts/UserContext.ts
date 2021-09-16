import { createContext } from "react";

interface User {
    firstName: string | null;
    lastName: string | null;
    username: string | null;
}

export default createContext<{
    user: User;
    setUser: (user: User) => void;
} | null>(null);
