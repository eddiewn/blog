import express from "express";
import pg from "pg"
import cors from "cors";
import bcrypt from "bcrypt"


const {Pool} = pg;
const saltRounds = 10;

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

app.use(cors({
    credentials: true,
}))

app.use(express.json())

app.get("/api/chungus", (req, res) => {
    res.send("Hello");
})

app.post("/api/register", (req,res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if(password !== confirmPassword) throw ("Password is not same")
        if(username.length < 3) throw ("Username is too short")


        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                const query = `INSERT INTO users(username, password_hash, role) VALUES ($1, $2, $3)`
                const values = [username, hash, "user"]

                pool.query(query, values);
            });
        });

        res.json({message: "Yes it worked"})
    } catch (error) {
        console.log("Error in server register:", error)
        res.status(400).json({error: `Error regestering user: ${error}`})
    }
})

app.post("/api/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const query = `SELECT password_hash FROM users WHERE username = $1`
    const value = [username]

    const hash = (await pool.query(query, value)).rows[0].password_hash;

    bcrypt.compare(password, hash, function(err, result) {
        if(result === true){
            res.json({valid: true})
        }else{
            res.status(400).json({valid: false})
        }
    });
})

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
})