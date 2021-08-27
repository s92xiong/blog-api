const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");

//  Show a specific blog post
exports.blog_post_GET = async (req, res, next) => {
  try {   
    // Query for blog and comments (find all comments using blog_post ID that matches the current params ID)
    const [blog, comments] = await Promise.all([
      Blog.findById(req.params.postId),
      Comment.find({ "blog_post": req.params.postId })
    ]);

    // Update the blog's comments with the queried comments & return blog to client
    blog.comments = comments;
    return res.json(blog);

  } catch (err) {
    console.error(err);
    return res.status(404).send("Error: cannot access blog post");
  }
};

// Form logic to create a blog post
exports.create_blog_post_POST = async (req, res) => {
  try {
    // Obtain blog input
    const { title, text } = req.body;
    
    // Validate blog input
    if (!(title && text)) return res.status(400).json({ error: "Error with one or more input fields!" });
  
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

// Update a blog post
exports.blog_post_PUT = async (req, res, next) => {
  try {
    // Get input
    const { title, text } = req.body;

    // Query for the specific blog post and update with inputs
    const blog = await Blog.findByIdAndUpdate(req.params.postId, { title, text });
    if (!blog) return res.status(404).json({ error: "Error updating blog" });
    res.status(201).json({ message: "Successfully updated blog post" });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// Delete a blog post
exports.blog_post_DELETE = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.postId);
    if (!blog) return res.status(404).json({ error: "Error deleting blog" });
    res.status(201).json({ message: `Blog post with ID: ${req.params.id} was successfully deleted` });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
