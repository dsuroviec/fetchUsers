import express from "express";
import { getUsers } from "./databasepg";
const app = express();

// GET USERS FROM FETCH-USERS-DB POSTGRES
app.get("/api/users", (req, res, next) => {
    getUsers()
        .then((users) => res.send(users))
        .catch((error) => next(error));
});

app.get("/login", (req, res, next) => {
    getUsers()
        .then((users) => res.send(users))
        .catch((error) => next(error));
});

app.listen(5000, () => {
    console.log("The application is listening on port 5000!");
});
