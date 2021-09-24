import express from "express";
import _ from "lodash";
const app = express();
app.use(express.json());
import {
    getUsers,
    authenticateUser,
    createUser,
    getCurrentUser,
    authorizeRequest,
} from "./databasepg";

app.post("/api/login", (req, res, next) => {
    authenticateUser(req.body)
        .then((token) => {
            if (!token) {
                return res.status(403).send();
            }
            res.send(token);
        })
        .catch((error) => next(error));
});

app.post("/api/signup", (req, res, next) => {
    createUser(req.body)
        .then((token) => {
            if (!token) {
                return res.status(403).send();
            }
            res.send(token);
        })
        .catch((error) => next(error));
});

app.get("/api/me", (req, res, next) => {
    authorizeRequest(req, res)
        .then((id) => {
            getCurrentUser(id).then((user) => res.send(user));
        })
        .catch((error) => next(error));
});

app.get("/api/users", (req, res, next) => {
    authorizeRequest(req, res)
        .then((response) => {
            res.send(response);
        })
        .catch((error) => next(error));
});

app.listen(5000, () => {
    console.log("The application is listening on port 5000!");
});
