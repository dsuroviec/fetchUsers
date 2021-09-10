import express from "express";
import { getUsers, authenticateUser } from "./databasepg";
const app = express();

// GET USERS FROM FETCH-USERS-DB POSTGRES
app.get("/api/users", (req, res, next) => {
    getUsers()
        .then((users) => res.send(users))
        .catch((error) => next(error));
});
app.use(express.json());
app.post("/api/token", (req, res, next) => {
    authenticateUser(req.body.username)
        .then((user) => res.send(user))
        .catch((error) => next(error));
});

app.listen(5000, () => {
    console.log("The application is listening on port 5000!");
});
