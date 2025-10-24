import express from "express";
import pg from "pg"
import cors from "cors";
import bcrypt from "bcrypt"
import session from "express-session"

declare module "express-session" {
    interface SessionData {
        user?: {
            id: number;
            username: string;
            role: string;
        }
    }
}



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
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(session({
    secret: 'chungus!',
    resave: false,
    saveUninitialized: false,
    
    cookie: { 
        //ONly for temporary HTTP site
        secure: false,
        maxAge: 1000 * 60 * 60,
        sameSite: "lax",
    }
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
    try {
    const username = req.body.username;
    const password = req.body.password;

    if(username.length < 3) throw ("username too short")

    const query = `SELECT password_hash FROM users WHERE username = $1`
    const value = [username]

    const hash = (await pool.query(query, value)).rows[0].password_hash;

    bcrypt.compare(password, hash, async function(err, result) {
        if(result){
            const query = `SELECT * FROM users WHERE username = $1`
            const user = (await pool.query(query, value)).rows[0];

            req.session.user = {
                id: user.id,
                username: user.username,
                role: user.role,
            }

            res.json({valid: true, user: req.session.user})
        }else{
            res.status(400).json({error: "Not valid login"})
        }
    });

    } catch (error) {
        res.status(400).json({error: error})
    }
})

app.get("/api/me", (req,res) => {
    try {
        const user = req.session.user;
        if(!user){
            res.json({error: "No user logged in"})
        }else{
            console.log(user)
            res.json({user})
        }

    } catch (error) {
        console.log("Error:", error)
    }
})

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
})