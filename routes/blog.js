const express = require("express");

const db = require("../data/database"); // imports the pool from database.js

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts"); // redirects user to designated address.
});

router.get("/posts", async function (req, res) {
  const query = `
  SELECT posts.*, authors.name AS author_name FROM posts
   INNER JOIN authors ON posts.author_id = authors.id`; // selects all post data, the authors.name and calling it author_name, and joining the authors table, replacing posts author_id with authors.id
  const [posts] = await db.query(query); // doing this and the above formatting just makes it easier to read I guess

  res.render("posts-list", { posts: posts }); // see authors if confused on what this does
});

router.get("/new-post", async function (req, res) {
  const [authors] = await db.query("SELECT * FROM authors"); // grabs all the info from the authors table, an async operation by the way SINCE WE USE promise, async and await, since obviously connecting to a server that may or may not be on a different machine would take some time.
  //we get the [authors] as a return value so we can use it elswwhere if we desire// something to note when using query. It will return an array, with the first entry itself being an array with all the info pulled from the query, and the second entry being a bunch of metadata

  res.render("create-post", { authors: authors }); // again, the first authors is a key that is used for the template, the second is the authors referring to the const above.
});

router.post("/posts", async function (req, res) {
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];

  //req.body; // lets us get data in a string or json object client side. done to receive data through POST/PUT requests
  await db.query(
    "INSERT INTO posts (title, summary, body, author_id) VALUES (?)",
    [data]
  ); // the ? and the [thign] are functionalities added by mysql2, basically it takes the data into [] and replaces the ? with the data, instead of us having to manually type it in. It does this by bascialyl taking in the array of info fromt the database and splitting it up into pieces and putting it into the places where it needs to go, ie the title, summary, content HTML elements etc etc
  res.redirect("/posts");
}); // listening for things to appear on localhostetc/posts

module.exports = router;
