const express = require("express");
const { body, validationResult } = require("express-validator");
const Blog = require("../models/blogModel");
const Comment = require('../models/commentModel');

// Blog-post Comment - POST
exports.create_comment_POST = [
  // body("name").trim().escape(),
  // body("text").trim().isLength({ min: 1 }).escape(),

  async (req, res) => {
    console.log(req.params.postId);
    // try {
    //   // Obtain blog input
    //   const { title, text } = req.body;
      
    //   // Validate blog input
    //   const errors = validationResult(req);
    //   if (!errors.isEmpty()) {
    //     return res.status(400).send("Error with one or more input fields!");
    //   }
    
    //   // Add blog data to MongoDB & return blog input
    //   const blog = await Blog.create({ 
    //     title,
    //     text
    //   });

    //   res.status(201).json(blog);
      
    // } catch (err) {
    //   console.error(err);
    // }
  }
];