import express from "express";
import pg from "pg"

const {Pool} = pg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "BlogDB",
    password: "eddiewn13",
    port: 5432,
});

(async() => {
    console.log(await (await pool.query(`SELECT CURRENT_TIMESTAMP;`)).rows[0])
})()

const app = express();
const PORT = 4000;

app.use(express.json())

app.get("/api/chungus", (req, res) => {
    res.send("Hello");
})

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
})