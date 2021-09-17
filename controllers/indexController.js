const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");

// Home page
exports.index = async (req, res) => {
  try {
    // Retrieve all blogs and comments from database

    const [blogs, comments] = await Promise.all([
      Blog.find().sort([["timestamp", "descending"]]),
      Comment.find()
    ]);

    // Get the total number of comments for each blog, store it as a property
    const blogs_with_total_comment_count = blogs.map(blog => {
      let sum = 0;
      comments.forEach(comment => {
        if (comment.blog_post.toString() == blog._id.toString()) {
          sum++;
        }
      });
      return { ...blog._doc, total_comments: sum };
    });

    res.json(blogs_with_total_comment_count);
  } catch (err) {
    return res.status(404).send("No blogs found in the database");
  }
};

// Reroute to index
exports.blog_posts_GET = (req, res) => res.redirect("/");