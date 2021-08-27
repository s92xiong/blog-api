const express = require("express");
const indexController = require("../controllers/indexController");
const userController = require("../controllers/userController");
const blogController = require("../controllers/blogController");
const commentController = require("../controllers/commentController");
const auth = require("../middleware/auth");
const router = express.Router();

// HOME PAGE
router.get("/", indexController.index); // Completed (home page renders all blog posts)
router.get("/posts", indexController.blog_posts_GET); // Completed (reroutes home/index)

// AUTH ROUTES
router.post("/register", userController.register); // Completed
router.post("/login", userController.login); // Completed

// BLOG POST
router.get("/posts/:postId", blogController.blog_post_GET); // Completed (Show blog post and comments)
router.post("/posts/:postId", commentController.create_comment_POST); // Completed (Add comment to blog post)

// CREATE A BLOG POST
router.post("/create-post/", auth, blogController.create_blog_post_POST); // Completed

router.put("/posts/:postId", auth, blogController.blog_post_PUT);
router.delete("/posts/:postId", blogController.blog_post_DELETE);

module.exports = router;