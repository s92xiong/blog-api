const Blog = require("../models/blogModel");

//  Show a specific blog post
exports.blog_post_GET = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.postId);
    res.json(blog);
  } catch (err) {
    console.error(err);
    return res.status(404).send("Error: cannot access blog post");
  }
};

// Show a form to create a blog post
exports.create_blog_post_GET = (req, res) => {
  res.status(200).send("Create a blog post - GET");
};

// Form logic to create a blog post
exports.create_blog_post_POST = async (req, res) => {
  try {
    // Obtain blog input
    const { title, text } = req.body;
    
    // Validate blog input
    if (!(title && text)) return res.status(400).send("Error with one or more input fields!");
  
    // Add blog data to MongoDB & return blog input
    const blog = await Blog.create({ 
      title,
      text
    });

    res.status(201).json(blog);
    
  } catch (err) {
    console.error(err);
  }
};

// Delete a blog post
exports.blog_post_DELETE = (req, res) => {
  res.status(200).send("Delete a blog post - DELETE");
};

// Update a blog post
exports.blog_post_PUT = (req, res) => {
  res.status(200).send("Update a blog post - PUT");
};