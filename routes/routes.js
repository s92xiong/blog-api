const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();

// HOME PAGE
router.get("/", controller.index);

// Blog Post Page w/ comments & comment form
router.get("/posts/:postId", controller.blog_post_GET);
router.post("/posts/:postId", controller.blog_post_comment_POST);

// Create a blog post page
router.get("/create-blog-post/", controller.blog_post_create_GET);
router.get("/create-blog-post/", controller.blog_post_create_POST);

// Delete a specific blog post
router.delete("/posts/:postId", controller.blog_post_DELETE);

// Update a specific blog post
router.put("/posts/:postId", controller.blog_post_PUT);


module.exports = router;