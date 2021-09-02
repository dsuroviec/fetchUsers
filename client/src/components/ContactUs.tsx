import React from "react";
import { Redirect } from "react-router-dom";

type ContactUsProps = {
    token: string | null;
};

export const ContactUs = ({ token }: ContactUsProps) => {
    return (
        <>
            {!token && <Redirect to="login" />}
            <h1>THIS IS ContactUs COMPONENT</h1>
        </>
    );
};
