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
