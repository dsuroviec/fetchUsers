import { createContext } from "react";

export default createContext<{
    token: string | null;
    setToken: (token: string) => void;
} | null>(null);
