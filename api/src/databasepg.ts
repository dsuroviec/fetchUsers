import { Pool } from "pg";

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

export const authenticateUser = async (username: string) => {
    const res = await pool.query({
        name: "authenticate-user",
        text: "SELECT username FROM users WHERE username=$1",
        values: [username],
    });

    console.log(res.rows);
    return res.rows;
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
    const response = await pool.query({
        name: "create-user",
        text: "INSERT INTO users (firstName, lastName, username, password) VALUES($1, $2, $3, $4) RETURNING *",
        values: [firstName, lastName, username, password],
    });

    return response.rows;
};
