const express = require("express");
const app = express();

const someUser = {
  first_name: "Jolyne",
  last_name: "Cujoh",
  stand: "Stone Free",
};

// Home page
exports.index = (req, res) => {
  res.status(200).send("Welcome!");
};

// Blog-post - GET
exports.blog_post_GET = (req, res) => {
  res.status(200).send(`Blog Post Page - GET REQUEST: id: ${req.params.postId}`);
};

// Blog-post Comment - POST
exports.blog_post_comment_POST = (req, res) => {
  res.status(200).send("Blog Post Page - POST REQUEST");
};

// Create Blog-post - GET
exports.blog_post_create_GET = (req, res) => {
  res.status(200).send("Create a blog post - GET");
};

// Reroute to index
exports.blog_posts_GET = (req, res) => res.redirect("/");

// Create Blog-post - POST
exports.blog_post_create_POST = (req, res) => {
  res.status(200).send("Create a blog post - POST");
};

// Delete Blog-post - DELETE
exports.blog_post_DELETE = (req, res) => {
  res.status(200).send("Delete a blog post - DELETE");
};

// Update Blog-post - PUT
exports.blog_post_PUT = (req, res) => {
  res.status(200).send("Update a blog post - PUT");
};