const express = require("express");
const app = express();

//  Show a specific blog post
exports.blog_post_GET = (req, res) => {
  res.status(200).send(`Blog Post Page - GET REQUEST: id: ${req.params.postId}`);
};

// Show a form to create a blog post
exports.create_blog_post_GET = (req, res) => {
  res.status(200).send("Create a blog post - GET");
};

// Form logic to create a blog post
exports.create_blog_post_POST = async (req, res) => {
  res.status(200).send("Create a blog post - POST");

  // Obtain blog input
  // const { title, timestamp, text } = req.body;

  // if (!(title && timestamp && text)) {
  //   return res.status(400).send("All input fields are required!");
  // }



  // Validate blog input
  // Return blog input


  
};

// Delete a blog post
exports.blog_post_DELETE = (req, res) => {
  res.status(200).send("Delete a blog post - DELETE");
};

// Update a blog post
exports.blog_post_PUT = (req, res) => {
  res.status(200).send("Update a blog post - PUT");
};