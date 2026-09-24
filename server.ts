import express from "express";
import pg from "pg";
import cors from "cors";
import bcrypt from "bcrypt";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import multer from "multer";
import crypto from "crypto";
import { rateLimit } from "express-rate-limit";
import cookieParser from "cookie-parser";
import { fileTypeFromBuffer } from "file-type";
import fs from "fs";

import { doubleCsrf } from "csrf-csrf";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
} from "@aws-sdk/client-s3";

import dotenv from "dotenv";

dotenv.config();

const bucketName = process.env.R2_BUCKET_NAME;
const accountId = process.env.R2_ACCOUNT_ID;
const accessKey = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

const resendKey = process.env.RESEND_API;

const secret = process.env.SECRET;

const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: accessKey!,
        secretAccessKey: secretAccessKey!,
    },
});

declare module "express-session" {
    interface SessionData {
        user?: {
            id: number;
            username: string;
            role: string;
        };
    }
}

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1 * 512 * 1024, // 512 kb
    },
});

const { Pool } = pg;
const saltRounds = 10;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

(async () => {
    console.log(await (await pool.query(`SELECT CURRENT_TIMESTAMP;`)).rows[0]);
})();

const app = express();
const PORT = 4000;
app.set("trust proxy", 1);

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }),
);

const PgSession = connectPgSimple(session);

const isProduction = process.env.NODE_ENV === "production";

app.use(
    session({
        store: new PgSession({
            pool: pool,
            tableName: "user_sessions",
            createTableIfMissing: true,
        }),
        secret: secret!,
        resave: false,
        saveUninitialized: true,

        cookie: {
            //ONly for temporary HTTP site
            secure: isProduction,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: isProduction ? "none" : "lax",
        },
    }),
);

app.use(cookieParser());

const { invalidCsrfTokenError, generateCsrfToken, doubleCsrfProtection } =
    doubleCsrf({
        getSecret: () => process.env.CSRF_SECRET!,
        getSessionIdentifier: (req) => req.session.id,
        cookieName: "csrf-token",
        cookieOptions: {
            httpOnly: false,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
        },
        size: 64,
        ignoredMethods: ["GET", "HEAD", "OPTIONS"],
    });

app.use(doubleCsrfProtection);

app.use(express.json());

import { Resend } from "resend";
import { create } from "domain";

const resend = new Resend(resendKey);

app.use("/api/admin/", (req, res, next) => {
    const user = req.session?.user;
    if (!user) {
        return res.status(403).json({ message: "Not logged in" });
    }

    if (user.role !== "admin") {
        return res.status(403).json({ message: "Not admin, unauthorized" });
    }

    next();
});

app.use(
    (
        error: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        if (error === invalidCsrfTokenError) {
            return res.status(403).json({
                error: "Invalid CSRF token",
            });
        }

        next(error);
    },
);

app.get("/api/admin/enter-blog", (req, res) => {
    res.json({ auth: true });
});

app.get("/api/chungus", (req, res) => {
    res.send("Hello");
});

app.get("/api/csrf-token", (req, res) => {
    const token = generateCsrfToken(req, res);
    res.json({ csrfToken: token });
});

app.post("/api/register", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if (password !== confirmPassword) throw "Password is not same";
        if (username.length < 3) throw "Username is too short";

        const hash = await bcrypt.hash(password, saltRounds);

        const query = `INSERT INTO users(username, password_hash, role) VALUES ($1, $2, $3)`;
        const values = [username, hash, "user"];

        await pool.query(query, values);

        res.status(201).json({ message: "User created" });
    } catch (error) {
        console.error("Error in server register:", error);
        res.json({ error: "Unexpected server error" });
    }
});

const sendMailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
});

app.post("/api/send-mail", sendMailLimiter, async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof message !== "string" ||
            message.length > 500 ||
            name.length > 30
        ) {
            return res.status(400).json({ error: "Invalid input" });
        }

        console.log(name, email, message);

        function escapeHtml(unsafe: string) {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

        await resend.emails.send({
            from: "contact@eddiewiiknilsson.com",
            to: "wiiknilssoneddie@gmail.com",
            replyTo: email,
            subject: `Message from ${name}`,
            html: `<p>${escapeHtml(message)}</p>`,
        });

        res.status(200).json({
            message: "Email sent successfully",
        });
    } catch (error) {
        // console.error("RESEND ERROR:", error);

        res.status(500).json({
            error: "Failed to send email",
        });
    }
});

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
});

app.post("/api/login", loginLimiter, async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (username.length < 3) throw "username too short";

        const query = `SELECT password_hash FROM users WHERE username = $1`;
        const value = [username];

        const result = await pool.query(query, value);
        if (result.rows.length === 0) {
            return res
                .status(401)
                .json({ error: "Password or username not matching" });
        }

        const hash = result.rows[0].password_hash;

        bcrypt.compare(password, hash, async function (err, result) {
            if (result) {
                const query = `SELECT * FROM users WHERE username = $1`;
                const user = (await pool.query(query, value)).rows[0];

                req.session.user = {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                };

                res.json({ valid: true, user: req.session.user });
            } else {
                res.status(401).json({
                    error: "Password or username not matching",
                });
            }
        });
    } catch (error) {
        res.status(400).json({ error: "Unexpected server error" });
    }
});

app.delete("/api/admin/delete-post", async (req, res) => {
    try {
        const deleteId = req.query.id;
        const query = "DELETE FROM posts WHERE id = $1";
        const value = [deleteId];
        await pool.query(query, value);
    } catch (error) {
        console.error("Error deleting post: ", error);
        res.send("Internal server error");
    }
});

const createBlogLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
});

app.post(
    "/api/admin/create-blog",
    upload.single("cover_image"),
    createBlogLimiter,
    async (req, res) => {
        try {
            const title = req.body.title;
            const summary = req.body.summary;
            const content = req.body.content;
            const tags = JSON.parse(req.body.tags);
            const image = req.file;
            const author_id = req.session.user!.id;

            if (image) {
                console.log(req.file);
                console.log(req.file?.path);

                // read the file and return buffer
                const buffer = image.buffer;
                // get the file type
                const type = await fileTypeFromBuffer(buffer);
                // validate
                const allowedTypes = ["image/jpeg", "image/png"];
                if (!type || !allowedTypes.includes(type.mime)) {
                    throw new Error("Invalid file type");
                }
            }

            const randomImageName = (bytes = 16) =>
                crypto.randomBytes(bytes).toString("hex");

            const imageName = randomImageName();
            const params = {
                Bucket: bucketName,
                Key: imageName,
                Body: req.file?.buffer,
                ContentType: req.file?.mimetype,
            };

            const command = new PutObjectCommand(params);

            await s3.send(command);

            console.log(image);
            // Get blog URL here
            const getObjectParams = {
                Bucket: bucketName,
                Key: imageName,
            };

            const command2 = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command2, { expiresIn: 3600 });
            const cover_image_url = url;

            const postQuery = `INSERT INTO posts (title, summary, content, cover_image, cover_image_url, author_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id`;
            const values = [
                title,
                summary,
                content,
                imageName,
                cover_image_url,
                author_id,
            ];

            const insertedPost = await pool.query(postQuery, values);

            const databaseTags = await pool.query(`SELECT * FROM tags`);
            const tagQuery = `INSERT INTO post_tags (tag_id, post_id) VALUES($1, $2)`;

            // console.log(insertedPost.rows[0])
            for (const databaseTag of databaseTags.rows) {
                for (const tag of tags) {
                    console.log(databaseTag.name, tag);

                    if (databaseTag.name !== tag) continue;

                    const tagValues = [databaseTag.id, insertedPost.rows[0].id];
                    await pool.query(tagQuery, tagValues);
                }
            }

            res.status(200).json({
                message: "It reached server, take this back yes.",
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "Unexpected server error" });
        }
    },
);

const requireLogin = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Not logged in",
        });
    }

    next();
};

app.post(
    "/api/update-profile",
    requireLogin,
    upload.single("profileImage"),
    async (req, res) => {
        const user = req.session.user;
        try {
            if (!user) {
                return res.status(401).json({
                    error: "Not logged in",
                });
            }

            const { displayName, bio } = req.body;
            const id = user.id;
            const image = req.file;

            if (image) {
                console.log(req.file);
                console.log(req.file?.path);

                // read the file and return buffer
                const buffer = image.buffer;
                // get the file type
                const type = await fileTypeFromBuffer(buffer);
                // validate
                const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
                if (!type || !allowedTypes.includes(type.mime)) {
                    throw new Error("Invalid file type");
                }
            }

            let profile_pic_url = null;

            const randomImageName = (bytes = 16) =>
                crypto.randomBytes(bytes).toString("hex");

            const imageName = randomImageName();

            if (image) {
                console.log(image);

                const params = {
                    Bucket: bucketName,
                    Key: imageName,
                    Body: req.file?.buffer,
                    ContentType: req.file?.mimetype,
                };

                const command = new PutObjectCommand(params);

                await s3.send(command);

                console.log(image);
                // Get blog URL here
                const getObjectParams = {
                    Bucket: bucketName,
                    Key: imageName,
                };

                const command2 = new GetObjectCommand(getObjectParams);
                const url = await getSignedUrl(s3, command2, {
                    expiresIn: 3600,
                });
                profile_pic_url = url;
            }

            let query;
            let values;
            if (profile_pic_url) {
                query = `UPDATE users SET display_name = $1, bio = $2, profile_pic_url = $3, profile_pic = $4 WHERE id = $5`;
                values = [displayName, bio, profile_pic_url, imageName, id];
            } else {
                query = `UPDATE users SET display_name = $1, bio = $2 WHERE id = $3`;
                values = [displayName, bio, id];
            }

            await pool.query(query, values);

            res.send({ message: "Hopefully it succeeded..." });
        } catch (error) {
            console.error(error);
            res.json({ error: "Unexpected server error" });
        }
    },
);

app.post("/api/sign-out", (req, res) => {
    req.session.destroy((error) => {
        if (error) return res.json({ message: "Failed to sign out" });

        res.clearCookie("connect.sid");
        res.json({ message: "Succeded to sign out" });
    });
});

app.get("/api/fetch-user-info", async (req, res) => {
    const userId = Number(req.query.userId);

    const userInfo = await pool.query(
        "SELECT id, username, role, bio, profile_pic_url, profile_pic, display_name FROM users WHERE id = $1",
        [userId],
    );

    const user = userInfo.rows[0];
    if (user.profile_pic) {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: user.profile_pic,
        });

        user.profile_pic_url = await getSignedUrl(s3, command, {
            expiresIn: 3600,
        });
    }

    res.send(userInfo.rows[0]);
});

app.get("/api/get-blogs", async (req, res) => {
    try {
        const fetchAmount = Number(req.query.fetchAmount);
        const offset = (Number(req.query.page) - 1) * fetchAmount;

        console.log(offset);
        console.log(fetchAmount);

        const postsTotal = await pool.query(`SELECT COUNT(*) FROM posts`);

        const totalBlogs = Number(postsTotal.rows[0].count);

        const query = `SELECT * FROM posts ORDER BY created_at DESC LIMIT $1 OFFSET $2`;
        const values = [fetchAmount, offset];
        const result = await pool.query(query, values);

        const blogs = result.rows;

        for (const blog of blogs) {
            const getObjectParams = {
                Bucket: bucketName,
                Key: blog.cover_image,
            };

            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            blog.cover_image_url = url;
        }

        res.json({
            blogs,
            totalBlogs,
        });
    } catch (error) {
        console.error(error);
        res.json({
            error: "Unexpected server error",
        });
    }
});

app.get("/posts", async (req, res) => {
    try {
        const { id } = req.query;
        const query = `SELECT * FROM posts WHERE id=$1`;
        const values = [id];
        const result = await pool.query(query, values);

        if (!result.rowCount)
            throw new Error("Could not get post from database.");

        const blog = result.rows[0];

        const getObjectParams = {
            Bucket: bucketName,
            Key: blog.cover_image,
        };

        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        blog.cover_image_url = url;

        res.status(200).json(blog);
    } catch (error) {
        console.log("Error getting specific post: ", error);
        res.json({ error: "Unexpected server error" });
    }
});

app.get("/api/get-tags", async (req, res) => {
    try {
        const query = `SELECT * FROM tags`;

        const tags = await pool.query(query);

        res.json(tags);
    } catch (error) {
        console.error(error);
        res.json({ error: "Unexpected server error" });
    }
});

app.get("/api/get-post-tags", async (req, res) => {
    try {
        const query = `SELECT * FROM post_tags`;

        const post_tags = await pool.query(query);
        res.json(post_tags.rows);
    } catch (error) {
        console.error("Unexpected Error:", error);
        res.json({ error: "Unexpected server error" });
    }
});

app.get("/api/me", (req, res) => {
    try {
        const user = req.session.user;
        if (!user) {
            res.json({ error: "No user logged in" });
        } else {
            console.log(user);
            res.json({ user });
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        res.json({ error: "Unexpected server error" });
    }
});

// app.get("/api/author", async (req, res) => {
//     try {
//         const author_id = Number(req.query.author_id);
//         console.log(author_id);

//         const query = `SELECT id, username, role, display_name, profile_pic_url FROM users WHERE id = $1`;
//         const result = await pool.query(query, [author_id]);

//         res.json(result.rows[0]);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error getting author" });
//     }
// });

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
});
