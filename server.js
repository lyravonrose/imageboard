const express = require("express");
const app = express();
const db = require("./db");
const { uploader } = require("./upload");
const s3 = require("./s3");

app.use(express.static("./public"));
app.use(express.json());

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    // console.log("POST/upload.json Route");
    // console.log("req.body:", req.body);

    const { username, title, description } = req.body;
    const { filename } = req.file;
    const url = `https://onionxxib.s3.amazonaws.com/${req.file.filename}`;

    // console.log("username:", req.body.username);
    // console.log("🔴", req.file);

    db.insertImages(url, username, title, description)
        .then(({ rows }) => {
            res.json({ success: true, data: rows[0] });
        })
        .catch((err) => {
            console.log("error inserting images:", err);
            res.json({ success: false });
        });
});

app.get("/get-images", (req, res) => {
    db.getImages()
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log("error:", err);
            res.send({ err: true });
        });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening 🧁🌸.`));
