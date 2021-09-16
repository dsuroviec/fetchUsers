import express from "express";
import jwt from "jsonwebtoken";
import { JsonWebTokenError } from "jsonwebtoken";
import { runInNewContext } from "vm";
import { getUsers, authenticateUser, createUser } from "./databasepg";
import _ from "lodash";
const app = express();

app.use(express.json());
// GET USERS FROM FETCH-USERS-DB POSTGRES
app.get("/api/users", (req, res, next) => {
    getUsers()
        .then((users) => res.send(users))
        .catch((error) => next(error));
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
