import express from "express";
import { readFileSync } from "fs";
import path from "path";
// import getUsers from "./src/databasepg";
import { getUsers } from "./databasepg";
const app = express();

// LOCAL DATA IN DATA.JSON TO TEST RESPONSE TO LOCALHOST:3000 FETCH
// app.get("/api/users", (req, res) => {
//     const products = JSON.parse(
//         readFileSync(path.join(__dirname, "./data.json"), "utf8")
//     );
//     console.log(JSON.stringify(products));
//     res.send(products);
// });

// GET USERS FROM FETCH-USERS-DB POSTGRES
app.get("/api/users", (req, res, next) => {
    getUsers()
        .then((users) => res.send(users))
        .catch((error) => next(error));
});

app.listen(5000, () => {
    console.log("The application is listening on port 5000!");
});
