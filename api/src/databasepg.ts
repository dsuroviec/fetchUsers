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
    const query = {
        name: "authenticate-user",
        text: "SELECT username FROM users WHERE username=$1",
        values: [username],
    };

    const res = await pool.query(query);

    return res.rows;
};
