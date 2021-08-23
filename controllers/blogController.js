const express = require("express");
const { body, validationResult } = require("express-validator");
const Blog = require("../models/blogpostModel");
const Comment = require('../models/commentModel');

//  Show a specific blog post
exports.blog_post_GET = (req, res) => {
  res.status(200).send(`Blog Post Page - GET REQUEST: id: ${req.params.postId}`);
};

// Show a form to create a blog post
exports.create_blog_post_GET = (req, res) => {
  res.status(200).send("Create a blog post - GET");
};

// Form logic to create a blog post
exports.create_blog_post_POST = [
  body("title").trim().isLength({ min: 1 }).escape(),
  body("text").trim().isLength({ min: 1 }).escape(),

  async (req, res, next) => {
    try {
      // Obtain blog input
      const { title, timestamp, text } = req.body;
      
      // Validate blog input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send("Error with one or more input fields!");
      }
      
      // if (!(title && text)) {
      //   return res.status(400).send("All input fields are required!");
      // }
    
      // Create blog in MongoDB
      const blog = await Blog.create({
        title,
        timestamp,
        text
      });
    
      // Return blog input
      res.status(201).json(blog);

    } catch (err) {
      console.error(err);
    }
  }
]

// Delete a blog post
exports.blog_post_DELETE = (req, res) => {
  res.status(200).send("Delete a blog post - DELETE");
};

// Update a blog post
exports.blog_post_PUT = (req, res) => {
  res.status(200).send("Update a blog post - PUT");
};