import express from "express";
import jwt from "jsonwebtoken";
import { JsonWebTokenError } from "jsonwebtoken";
import { runInNewContext } from "vm";
import { getUsers, authenticateUser, createUser } from "./databasepg";

import _ from "lodash";
const app = express();

app.use(express.json());

const userArray = [
    { username: "darren", title: "man" },
    { username: "ert", title: "ert" },
];

const authorizeRequest = async (req: any, res: any) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    try {
        const verified: any = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET!
        );
        return verified.username;
    } catch (error) {
        res.status(403).send("Sorry, you're not authorized!");
    }
};

app.get("/api/users", (req, res, next) => {
    authorizeRequest(req, res)
        .then((response) => {
            res.send(response);
        })
        .catch((error) => next(error));
});

app.post("/api/login", (req, res, next) => {
    authenticateUser(req.body)
        .then((token) => {
            if (!token) {
                return res.status(403).send("Invalid Credentials");
            }
            res.send(token);
        })
        .catch((error) => next(error));
});

app.post("/api/signup", (req, res, next) => {
    createUser(req.body)
        .then((token) => {
            if (!token) {
                return res.status(403).send("Invalid Credentials");
            }
        })
        .catch((error) => next(error));
});

app.listen(5000, () => {
    console.log("The application is listening on port 5000!");
});
