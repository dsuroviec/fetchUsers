import { useContext } from "react";
import { Redirect } from "react-router-dom";
import TokenContext from "../contexts/TokenContext";

export const ContactUs = () => {
    const { token } = useContext(TokenContext)!;

    return (
        <>
            {!token && <Redirect to="login" />}
            <h1>THIS IS ContactUs COMPONENT</h1>
        </>
    );
};
