import { Pool } from "pg";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request } from "express";
dotenv.config();
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "postgres",
    database: "postgres",
});

interface AuthenticateUserProps {
    username: string;
    password: string;
}
export const authenticateUser = async ({
    username,
    password,
}: AuthenticateUserProps) => {
    const user = await pool.query({
        name: "authenticate-username",
        text: "SELECT id, username, firstname, lastname FROM users WHERE username=$1 ",
        values: [username],
    });
    // If the username exists check the password
    if (user.rows.length) {
        const storedPassword = await pool
            .query({
                name: "authenticate-password",
                text: "SELECT password FROM users WHERE username=$1 ",
                values: [username],
            })
            .then((response) => response.rows[0].password);

        // Check if passwords match
        const match = await bcrypt.compare(password, storedPassword);
        // if there is a match, return JWT token
        if (match) {
            const accessTokenSecret = jwt.sign(
                { id: user.rows[0].id },
                process.env.ACCESS_TOKEN_SECRET!,
                { expiresIn: "1h" }
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
        { id: response.rows[0].id },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "1h" }
    );

    return accessTokenSecret;
};

export const authorizeRequest = async (req: Request, res: any) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    try {
        if (!token) {
            throw new Error();
        }
        const { id }: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        console.log(id, "Here is my id from the token");
        return id;
    } catch (error) {
        console.log("authorizeRequestFunctionFailed", error);
    }
};

export const getCurrentUser = async (
    id: string | jwt.JwtPayload | undefined
) => {
    const user = await pool.query({
        name: "get-current-user",
        text: "SELECT username, firstname, lastname FROM users WHERE id=$1 ",
        values: [id],
    });

    return user.rows[0];
};

export const getUsers = async () => {
    const res = await pool.query(`Select * from users`);
    return res.rows;
};
