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

app.use("/api/admin/", (req,res, next) => {
    const user = req.session?.user;
    if(!user){
        return res.status(403).json({message: "Not logged in"})
    }

    if(user.role !== "admin"){
        return res.status(403).json({message: "Not admin, unauthorized"})
    }

    next();    
})

app.get("/api/admin/enter-blog", (req, res) => {
    res.json({auth: true})
})

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

app.post("/api/admin/create-blog", async (req, res) => {
    try{
        const title = req.body.title;
        const summary = req.body.summary;
        const content = req.body.content;
        const tags = req.body.tags;
        const coverImage = req.body.cover_image;
        console.log(tags)

        const postQuery = `INSERT INTO posts (title, summary, content, cover_image) VALUES($1, $2, $3, $4) RETURNING id`
        const values = [title, summary, content, coverImage]

        const insertedPost = await pool.query(postQuery, values)


        const databaseTags = await pool.query(`SELECT * FROM tags`)
        const tagQuery = `INSERT INTO post_tags (post_id, tag_id) VALUES($1, $2)`

        for (const databaseTag of databaseTags.rows) {
            for(const tag of tags){
                console.log(databaseTag.name)
                if(databaseTag.name !== tag) continue

                const tagValues = [insertedPost.rows[0].id, databaseTag.id]
                await pool.query(tagQuery, tagValues)
            }
        }
        res.status(200).json({message: "It reached server, take this back yes."})
    } catch (error) {
        console.log(error)
        res.status(400).json({error: "Failed to insert blog"})
    }
})

app.get("/api/get-blogs", async(req, res) => {
    console.log("Hello I'm in")
    try {
        const query = `SELECT * FROM posts`;
        const blogs = await pool.query(query);

        res.json({
            blogs: blogs.rows
        })    
    } catch (error) {
        res.status(500).json({
        error: error
        });
    }
})

app.get("/api/get-tags", async (req, res) => {
    const query = `SELECT name FROM tags`

    const tags = await pool.query(query);

    res.json(tags)
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