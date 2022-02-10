DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS images;


CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    url VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    comment TEXT NOT NULL,
    image_id INT NOT NULL references images(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO images(url) VALUES
('https://onionxxib.s3.amazonaws.com/219PhkembeXVw7uusgDfZP2X01DgCNFi.jpg'),
("https://onionxxib.s3.amazonaws.com/tnjTGn97FisZZ__MzgTfflqScdqfDVmK.jpg"),
("https://onionxxib.s3.amazonaws.com/aStbqlH38U_-AwOkI3AG9Vfek8T3-6Sd.jpeg"),
("https://onionxxib.s3.amazonaws.com/Y-G2T3diKgrykca-Bvhsjo1XEx6-qEsy.jpg"),
("https://onionxxib.s3.amazonaws.com/rXev0Rh7MucB91F7ddf3WaSYaKncZw3x.jpg"),
("https://onionxxib.s3.amazonaws.com/5WaDa8LZ5xZvHvCGqLOra6QKK7DFjDzz.JPG"),
("https://onionxxib.s3.amazonaws.com/jUemar6PSqLj5aISGUFdIgEbehgMnhsM.jpeg"),
("https://onionxxib.s3.amazonaws.com/45ObJj3kyiT_3qFnyZBlmWkXmWdkVLBV.JPG"),
("https://onionxxib.s3.amazonaws.com/YdAYtrNu2hc7huDmBHqoIIYzpChpKYlZ.JPG"),
("https://onionxxib.s3.amazonaws.com/dR9OEEJdiql1bSqyhVb01vHe2G0Zp7YR.jpg"),
("https://onionxxib.s3.amazonaws.com/-bCzIrVyaTkrskk_eNEp7IFMZ7HsIguj.jpeg"),
("https://onionxxib.s3.amazonaws.com/5glytPwguRQATXNk9QPUdv7cjpqSkIXb.jpeg"),
("https://onionxxib.s3.amazonaws.com/3RoRxF3dlfGK5TPVdKm51Y9472fOyMP8.jpg"),
("https://onionxxib.s3.amazonaws.com/NVIcqorJwwRw86Q1TV42cp4wZrkeF69k.jpg"),
("https://onionxxib.s3.amazonaws.com/G35INaJRo9LeA2GthxcIYIlNkxzB_2o5.JPG");

-- INSERT INTO images (url, username, title, description) VALUES (
--     'https://s3.amazonaws.com/imageboard/jAVZmnxnZ-U95ap2-PLliFFF7TO0KqZm.jpg',
--     'funkychicken',
--     'Welcome to Spiced and the Future!',
--     'This photo brings back so many great memories.'
-- );

-- INSERT INTO images (url, username, title, description) VALUES (
--     'https://s3.amazonaws.com/imageboard/wg8d94G_HrWdq7bU_2wT6Y6F3zrX-kej.jpg',
--     'discoduck',
--     'Elvis',
--     'We can''t go on together with suspicious minds.'
-- );

-- INSERT INTO images (url, username, title, description) VALUES (
--     'https://s3.amazonaws.com/imageboard/XCv4AwJdm6QuzjenFPKJocpipRNNMwze.jpg',
--     'discoduck',
--     'To be or not to be',
--     'That is the question.'
-- );
