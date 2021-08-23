const express = require("express");
const app = express();

// Blog-post Comment - POST
exports.create_comment_POST = (req, res) => {
  res.status(200).send("Blog Post Page - POST REQUEST");
};