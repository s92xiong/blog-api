const Comment = require('../models/commentModel');

// Blog-post Comment - POST
exports.create_comment_POST = async (req, res, next) => {
  try {
    // Obtain comment input
    const { name, text } = req.body;
    
    // Validate comment input
    if (!(name && text)) {
      return res.status(400).send("Error with one or more input fields!");
    }
  
    // Add comment data to MongoDB & return comment input
    const comment = await Comment.create({ 
      name,
      text,
      blog_post: req.params.postId // save the blogpost ID to the comment
    });

    return res.status(201).json(comment);
    
  } catch (err) {
    console.error(err);
  }
}