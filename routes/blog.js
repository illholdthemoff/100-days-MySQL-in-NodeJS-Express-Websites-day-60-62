const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts"); // redirects user to designated address.
});

router.get("/posts", function (req, res) {
  res.render("posts-list");
});

router.get("/new-post", function (req, res) {
  res.render("create-post");
});

module.exports = router;
