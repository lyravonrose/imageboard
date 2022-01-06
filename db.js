const spicedPg = require("spiced-pg");
const database = "images";
const username = "postgres";
const password = "postgres";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${username}:${password}@localhost:5432/${database}`
);

console.log(`[db] connecting to:${database}`);

module.exports.getImages = () => {
    const q = "SELECT * FROM images ORDER BY id DESC LIMIT 9";
    return db.query(q);
};

module.exports.insertImages = (url, username, title, description) => {
    const q = `INSERT INTO images (url, username, title, description) 
    VALUES($1, $2, $3, $4) RETURNING url, username, title, description`;
    const params = [url, username, title, description];
    return db.query(q, params);
};

module.exports.selectImage = (imageId) => {
    const q = `SELECT * FROM images WHERE id=$1`;
    const params = [imageId];
    return db.query(q, params);
};

module.exports.getMoreImages = (lowestId) => {
    const q = `SELECT url, title, id, (SELECT id
    FROM images
    ORDER BY id ASC
    LIMIT 1) AS "lowestId" FROM images
    WHERE id < $1
    ORDER BY id DESC
    LIMIT 9`;
    const params = [lowestId];
    return db.query(q, params);
};
