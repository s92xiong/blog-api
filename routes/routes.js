const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();

// HOME PAGE
router.get("/", controller.index);

// Blog Post + comments + comment form
router.get("/posts/:postId", controller.blog_post_GET);
router.post("/posts/:postId", controller.blog_post_comment_POST);

// Reroute to index
router.get("/posts", controller.blog_posts_GET);

// Create a blog post
router.get("/create-post/", controller.blog_post_create_GET);
router.post("/create-post/", controller.blog_post_create_POST);

// Delete a blog post
router.delete("/posts/:postId", controller.blog_post_DELETE);

// Update a blog post
router.put("/posts/:postId", controller.blog_post_PUT);


module.exports = router;