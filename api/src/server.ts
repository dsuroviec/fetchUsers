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

function authenticateToken(req: any, res: any, next: any) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!,
        (err: any, user: any) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        }
    );
}

app.get("/api/users", authenticateToken, (req: any, res, next) => {
    res.json(
        userArray.filter((user: any) => user.username === req.user.username)
    );
});

app.post("/api/token", (req, res, next) => {
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
        .then((user) => {
            res.send(_.omit(user, ["password"]));
        })
        .catch((error) => next(error));
});

app.listen(5000, () => {
    console.log("The application is listening on port 5000!");
});
