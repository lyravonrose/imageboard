const express = require("express");
const app = express();
const db = require("./db");
const { uploader } = require("./upload");
const s3 = require("./s3");
const cookieSession = require("cookie-session");
const { IoTSecureTunneling } = require("aws-sdk");
const moment = require("moment");

const packageLock =
    process.env.PACKAGE_LOCK || require("./package-lock").PACKAGE_LOCK;

const secrets = process.env.SECRETS || require("./secrets").SECRETS;

const cookieSessionMiddleware = cookieSession({
    secret: secrets,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true,
});

app.use(cookieSessionMiddleware);

if (process.env.NODE_ENV == "production") {
    app.use((req, res, next) => {
        if (req.headers["x-forwarded-proto"].startsWith("https")) {
            return next();
        }
        res.redirect(`https://${req.hostname}${req.url}`);
    });
}

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

app.get("/get-more-images/:lowestId", (req, res) => {
    db.getMoreImages(req.params.lowestId)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log("get more images error:", err);
            res.send({ err: true });
        });
});

app.get("/getImageById/:id", (req, res) => {
    db.selectImage(req.params.id)
        .then(({ rows }) => {
            // console.log("🥟:", rows[0]);
            rows[0].created_at = moment(rows[0].created_at).fromNow();
            res.json(rows[0]);
        })
        .catch((err) => {
            console.log("error:", err);
            res.send({ err: true });
        });
});

app.get("/comments/:id", (req, res) => {
    db.getComments(req.params.id)
        .then(({ rows }) => {
            console.log("🥤", rows);
            rows.forEach((comment) => {
                comment.created_at = moment(comment.created_at).fromNow();
            });
            res.json(rows);
        })
        .catch((err) => {
            console.log("error:", err);
        });
});

app.post("/comment", (req, res) => {
    const { imageId, username, comment } = req.body;
    db.addComments(imageId, username, comment)
        .then(({ rows }) => {
            res.json({ data: rows[0] });
        })
        .catch((err) => {
            console.log("error inserting comments:", err);
        });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

if (require.main == module) {
    app.listen(process.env.PORT || 8080, () =>
        console.log(`I'm listening 🧁🌸.`)
    );
}
