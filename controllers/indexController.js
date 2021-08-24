const Blog = require("../models/blogModel");

// Home page
exports.index = async (req, res) => {
  try {
    // Retrieve all blogs in database
    const blogs = await Blog.find().sort([["timestamp", "descending"]]);
    // console.log(blogs[0].url);
    res.json(blogs);
  } catch (err) {
    return res.status(404).send("No blogs found in the database");
  }
};

// Reroute to index
exports.blog_posts_GET = (req, res) => res.redirect("/");