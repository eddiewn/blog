import express from "express";

const app = express();
const PORT = 4000;

app.use(express.json())

app.get("/api/chungus", (req, res) => {
    res.send("Hello");
})

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
})