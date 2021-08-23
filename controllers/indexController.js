const express = require("express");
const app = express();

// Home page
exports.index = (req, res) => {
  res.status(200).send("Welcome!");
};

// Reroute to index
exports.blog_posts_GET = (req, res) => res.redirect("/");