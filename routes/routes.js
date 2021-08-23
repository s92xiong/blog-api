const express = require("express");
const indexController = require("../controllers/indexController");
const blogController = require("../controllers/blogController");
const commentController = require("../controllers/commentController");
const router = express.Router();

// HOME PAGE
router.get("/", indexController.index);
router.get("/posts", indexController.blog_posts_GET);

// BLOG POST
router.get("/posts/:postId", blogController.blog_post_GET);
router.post("/posts/:postId", commentController.create_comment_POST);

// FORM TO CREATE A BLOG
router.get("/create-post/", blogController.create_blog_post_GET);
router.post("/create-post/", blogController.create_blog_post_POST); // Completed

router.delete("/posts/:postId", blogController.blog_post_DELETE);
router.put("/posts/:postId", blogController.blog_post_PUT);

module.exports = router;