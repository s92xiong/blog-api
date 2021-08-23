const express = require("express");
const { body, validationResult } = require("express-validator");
const Blog = require("../models/blogpostModel");
const Comment = require('../models/commentModel');

// Blog-post Comment - POST
exports.create_comment_POST = (req, res) => {
  res.status(200).send("Blog Post Page - POST REQUEST");
};