import { Pool } from "pg";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "postgres",
    database: "postgres",
});

export const getUsers = async () => {
    const res = await pool.query(`Select * from users`);
    return res.rows;
};

interface AuthenticateUserProps {
    username: string;
    password: string;
}
export const authenticateUser = async ({
    username,
    password,
}: AuthenticateUserProps) => {
    const usernameResponse = await pool.query({
        name: "authenticate-username",
        text: "SELECT username FROM users WHERE username=$1 ",
        values: [username],
    });
    // If the username exists check the password
    if (usernameResponse.rows.length) {
        const passwordResponse = await pool.query({
            name: "authenticate-password",
            text: "SELECT password FROM users WHERE username=$1 ",
            values: [username],
        });
        // Check if passwords match
        const match = await bcrypt.compare(
            password,
            passwordResponse.rows[0].password
        );
        // if there is a match, return JWT token
        // then front end does what it wants with the token
        if (match) {
            const accessTokenSecret = jwt.sign(
                usernameResponse.rows[0],
                process.env.ACCESS_TOKEN_SECRET!
            );
            return accessTokenSecret;
        }
    }
};

interface CreateUserProps {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

export const createUser = async ({
    firstName,
    lastName,
    username,
    password,
}: CreateUserProps) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await pool.query({
        name: "create-user",
        text: "INSERT INTO users (firstName, lastName, username, password) VALUES($1, $2, $3, $4) RETURNING *",
        values: [firstName, lastName, username, hashedPassword],
    });

    const accessTokenSecret = jwt.sign(
        response.rows[0].username,
        process.env.ACCESS_TOKEN_SECRET!
    );
    response.rows[0].token = accessTokenSecret;

    return response.rows[0];
};
