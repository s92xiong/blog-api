const express = require("express");
const indexController = require("../controllers/indexController");
const userController = require("../controllers/userController");
const blogController = require("../controllers/blogController");
const commentController = require("../controllers/commentController");
const router = express.Router();

// HOME PAGE
router.get("/", indexController.index); // Completed (home page renders all blog posts)
router.get("/posts", indexController.blog_posts_GET); // Completed (reroutes home/index)

// USER ROUTES & AUTHENTICATION
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

// BLOG POST
router.get("/posts/:postId", blogController.blog_post_GET); // Completed (Show blog post and comments)
router.post("/posts/:postId", commentController.create_comment_POST); // Completed (Add comment to blog post)

// FORM TO CREATE A BLOG
router.get("/create-post/", blogController.create_blog_post_GET);
router.post("/create-post/", blogController.create_blog_post_POST); // Completed

router.delete("/posts/:postId", blogController.blog_post_DELETE);
router.put("/posts/:postId", blogController.blog_post_PUT);

module.exports = router;