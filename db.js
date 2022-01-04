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
    const q = "SELECT * FROM images ORDER BY id DESC";
    return db.query(q);
};

module.exports.insertImages = (url, username, title, description) => {
    const q = `INSERT INTO images (url, username, title, description) 
    VALUES($1, $2, $3, $4) RETURNING url, username, title, description`;
    const params = [url, username, title, description];
    return db.query(q, params);
};
