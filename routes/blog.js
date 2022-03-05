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

router.get("/posts/:id", async function (req, res) {
  // dynamic route with route parameters, since we are loading a page via a dynamic link
  const query = `
    SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts 
    INNER JOIN authors ON posts.author_id = authors.id
    WHERE posts.id = ?
  `;

  const [posts] = await db.query(query, [req.params.id]); // replaces the ? with the selected id which is grabbed from the URL

  if (!posts || posts.length === 0) {
    return res.status(404).render("404"); //returns 404 page if an invalid post is added on the URL, or if there's no posts.
  }

  const postData = {
    ...posts[0], //spreads out values from array into this object
    date: posts[0].date.toISOString(), //changes the date object into a string so the datetime attribute in post-detail can use it.
    humanReadableDate: posts[0].date.toLocaleDateString("en-US", {
      // turns the date into a human readable object, with additional parameters as to what we want the localization to be and the format of the date output
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  res.render("post-detail", { post: postData });
});

router.get("/posts/:id/edit", async function (req, res) {
  const query = `
  SELECT * FROM posts WHERE id = ?
  `;
  const [posts] = await db.query(query, [req.params.id]);

  if (!posts || posts.length === 0) {
    return res.status(404).render("404");
  }

  res.render("update-post", { post: posts[0] });
});

router.post("/posts/:id/edit", async function (req, res) {
  const query = `
  UPDATE posts SET title = ?, summary = ?, body = ?
  WHERE id = ?
`;

  await db.query(query, [
    req.body.title,
    req.body.summary,
    req.body.content, // body.title, .summary etc because these are the NAMES of the items in the update-post ejs
    req.params.id,
  ]);

  res.redirect("/posts");
});

router.post("/posts/:id/delete", async function (req, res) {
  await db.query(" DELETE FROM posts WHERE id = ?", [req.params.id]); // puts the value inside the [], in this case the id, where the ? is when the code is executed
  res.redirect("/posts");
});

module.exports = router;
