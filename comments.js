// Create web server
// Create route to get comments
// Create route to add comments
// Create route to delete comments
// Create route to update comments

// Import express
const express = require("express");

// Import express router
const router = express.Router();

// Import model
const Comment = require("../models/comment");

// Import middleware
const auth = require("../middleware/auth");

// Import comment controller
const commentController = require("../controllers/comments");

// Create route to get comments
router.get("/", commentController.getComments);

// Create route to add comments
router.post("/", auth, commentController.addComment);

// Create route to delete comments
router.delete("/:id", auth, commentController.deleteComment);

// Create route to update comments
router.put("/:id", auth, commentController.updateComment);

// Export module
module.exports = router;